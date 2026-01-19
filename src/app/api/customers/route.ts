import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

interface Customer {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  is_active: boolean;
  total_orders: number;
  total_spent: number;
  created_at: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, first_name, last_name, phone, is_active } = body;

    if (!email || !first_name || !last_name) {
      return NextResponse.json(
        { error: 'Email, first name, and last name are required' },
        { status: 400 }
      );
    }

    const result = await query<Customer>(
      `INSERT INTO customers (email, first_name, last_name, phone, is_active)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [email, first_name, last_name, phone, is_active ?? true]
    );

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error('Customer POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const search = searchParams.get('search') || '';

    const offset = (page - 1) * limit;

    let whereClause = 'WHERE 1=1';
    const params: any[] = [];
    let paramCount = 1;

    if (search) {
      whereClause += ` AND (email ILIKE $${paramCount} OR first_name ILIKE $${paramCount} OR last_name ILIKE $${paramCount})`;
      params.push(`%${search}%`);
      paramCount++;
    }

    // Get total count
    const countResult = await query<{ count: number }>(
      `SELECT COUNT(*) as count FROM customers ${whereClause}`,
      params
    );
    const total = parseInt(countResult[0]?.count?.toString() || '0');

    // Get customers
    const customers = await query<Customer>(
      `SELECT * FROM customers 
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT $${paramCount} OFFSET $${paramCount + 1}`,
      [...params, limit, offset]
    );

    return NextResponse.json({
      success: true,
      data: customers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Customers GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
