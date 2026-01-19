// Security utilities for protecting against various attacks
import crypto from 'crypto';

/**
 * Rate Limiter - Protects against DDoS and brute force attacks
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number = 100, windowMs: number = 15 * 60 * 1000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    
    return true;
  }

  reset(identifier: string): void {
    this.requests.delete(identifier);
  }
}

/**
 * Input Sanitization - Protects against XSS and injection attacks
 */
export class InputSanitizer {
  /**
   * Sanitize HTML input to prevent XSS
   */
  static sanitizeHtml(input: string): string {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  /**
   * Sanitize SQL input to prevent SQL injection
   */
  static sanitizeSql(input: string): string {
    return input
      .replace(/'/g, "''")
      .replace(/;/g, '')
      .replace(/--/g, '')
      .replace(/\/\*/g, '')
      .replace(/\*\//g, '');
  }

  /**
   * Validate email format
   */
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validate UUID format
   */
  static isValidUuid(uuid: string): boolean {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  }

  /**
   * Remove dangerous characters from file names
   */
  static sanitizeFileName(fileName: string): string {
    return fileName
      .replace(/[^a-zA-Z0-9._-]/g, '_')
      .replace(/\.{2,}/g, '.')
      .substring(0, 255);
  }
}

/**
 * Encryption utilities for sensitive data
 */
export class Encryption {
  private static algorithm = 'aes-256-gcm';
  
  /**
   * Encrypt sensitive data
   */
  static encrypt(text: string, key: string): string {
    try {
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv(
        this.algorithm,
        Buffer.from(key.padEnd(32, '0').substring(0, 32)),
        iv
      );
      
      let encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      
      const authTag = cipher.getAuthTag();
      
      return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
    } catch (error) {
      throw new Error('Encryption failed');
    }
  }

  /**
   * Decrypt sensitive data
   */
  static decrypt(encryptedData: string, key: string): string {
    try {
      const parts = encryptedData.split(':');
      const iv = Buffer.from(parts[0], 'hex');
      const authTag = Buffer.from(parts[1], 'hex');
      const encrypted = parts[2];
      
      const decipher = crypto.createDecipheriv(
        this.algorithm,
        Buffer.from(key.padEnd(32, '0').substring(0, 32)),
        iv
      );
      
      decipher.setAuthTag(authTag);
      
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      
      return decrypted;
    } catch (error) {
      throw new Error('Decryption failed');
    }
  }

  /**
   * Generate secure random token
   */
  static generateToken(length: number = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  /**
   * Hash data (one-way)
   */
  static hash(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
  }
}

/**
 * CSRF Protection
 */
export class CsrfProtection {
  private static tokens: Map<string, { token: string; expires: number }> = new Map();
  
  /**
   * Generate CSRF token
   */
  static generateToken(sessionId: string): string {
    const token = Encryption.generateToken(32);
    const expires = Date.now() + 3600000; // 1 hour
    
    this.tokens.set(sessionId, { token, expires });
    
    // Clean up expired tokens
    this.cleanupExpiredTokens();
    
    return token;
  }

  /**
   * Verify CSRF token
   */
  static verifyToken(sessionId: string, token: string): boolean {
    const stored = this.tokens.get(sessionId);
    
    if (!stored) {
      return false;
    }
    
    if (Date.now() > stored.expires) {
      this.tokens.delete(sessionId);
      return false;
    }
    
    return stored.token === token;
  }

  /**
   * Clean up expired tokens
   */
  private static cleanupExpiredTokens(): void {
    const now = Date.now();
    for (const [sessionId, data] of this.tokens.entries()) {
      if (now > data.expires) {
        this.tokens.delete(sessionId);
      }
    }
  }
}

/**
 * Password validation and strength checking
 */
export class PasswordValidator {
  /**
   * Check password strength
   */
  static checkStrength(password: string): {
    isValid: boolean;
    score: number;
    message: string;
  } {
    let score = 0;
    const messages: string[] = [];

    if (password.length < 8) {
      messages.push('Password must be at least 8 characters long');
    } else {
      score += 1;
    }

    if (!/[a-z]/.test(password)) {
      messages.push('Password must contain at least one lowercase letter');
    } else {
      score += 1;
    }

    if (!/[A-Z]/.test(password)) {
      messages.push('Password must contain at least one uppercase letter');
    } else {
      score += 1;
    }

    if (!/[0-9]/.test(password)) {
      messages.push('Password must contain at least one number');
    } else {
      score += 1;
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      messages.push('Password must contain at least one special character');
    } else {
      score += 1;
    }

    return {
      isValid: score === 5,
      score,
      message: messages.length > 0 ? messages.join('. ') : 'Password is strong',
    };
  }

  /**
   * Check if password is compromised (basic check against common passwords)
   */
  static isCommonPassword(password: string): boolean {
    const commonPasswords = [
      'password', '123456', '12345678', 'qwerty', 'abc123',
      'monkey', '1234567', 'letmein', 'trustno1', 'dragon',
      'baseball', 'iloveyou', 'master', 'sunshine', 'ashley',
    ];
    
    return commonPasswords.includes(password.toLowerCase());
  }
}

/**
 * IP Address utilities for security
 */
export class IpUtils {
  /**
   * Extract IP from request headers (handles proxies)
   */
  static extractIp(headers: Record<string, string | undefined>): string {
    const forwarded = headers['x-forwarded-for'];
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    
    return headers['x-real-ip'] || headers['remote-addr'] || 'unknown';
  }

  /**
   * Check if IP is in blacklist
   */
  static isBlacklisted(ip: string, blacklist: string[]): boolean {
    return blacklist.includes(ip);
  }

  /**
   * Check if IP is in whitelist
   */
  static isWhitelisted(ip: string, whitelist: string[]): boolean {
    return whitelist.includes(ip);
  }
}

/**
 * Content Security Policy generator
 */
export class CspGenerator {
  static generate(): string {
    return [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ');
  }
}
