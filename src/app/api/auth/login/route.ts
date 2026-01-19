import { NextRequest, NextResponse } from 'next/server';
import { comparePassword, generateAccessToken, generateRefreshToken } from '@/lib/auth';
import { query } from '@/lib/db';
import { RateLimiter, InputSanitizer } from '@/lib/security';
import { User } from '@/types';

const loginLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 attempts per 15 minutes

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Rate limiting check
    if (!loginLimiter.isAllowed(ip)) {
      return NextResponse.json(
        { error: 'Too many login attempts. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    // Input validation
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (!InputSanitizer.isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Get user from database
    const users = await query<User>(
      'SELECT * FROM users WHERE email = $1 AND is_active = true',
      [email.toLowerCase()]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const user = users[0];

    // Check if account is locked
    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      return NextResponse.json(
        { error: 'Account is temporarily locked. Please try again later.' },
        { status: 423 }
      );
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password_hash);

    if (!isValidPassword) {
      // Increment failed login attempts
      await query(
        `UPDATE users 
         SET failed_login_attempts = failed_login_attempts + 1,
             locked_until = CASE 
               WHEN failed_login_attempts + 1 >= 5 
               THEN NOW() + INTERVAL '15 minutes'
               ELSE locked_until
             END
         WHERE id = $1`,
        [user.id]
      );

      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Reset failed attempts and update last login
    await query(
      `UPDATE users 
       SET failed_login_attempts = 0,
           locked_until = NULL,
           last_login = NOW()
       WHERE id = $1`,
      [user.id]
    );

    // Generate tokens
    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const refreshToken = generateRefreshToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Store refresh token
    await query(
      'INSERT INTO refresh_tokens (user_id, token, expires_at) VALUES ($1, $2, NOW() + INTERVAL \'30 days\')',
      [user.id, refreshToken]
    );

    // Log activity
    await query(
      'INSERT INTO activity_logs (user_id, action, ip_address, user_agent) VALUES ($1, $2, $3, $4)',
      [user.id, 'login', ip, request.headers.get('user-agent')]
    );

    // Remove sensitive data
    const { password_hash, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      data: {
        user: userWithoutPassword,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
