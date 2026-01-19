import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAccessToken } from '@/lib/auth';
import { Order } from '@/types';

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    if (!token || !verifyAccessToken(token)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search') || '';

    const offset = (page - 1) * limit;

    // Build query
    let whereClause = 'WHERE 1=1';
    const params: any[] = [];
    let paramCount = 1;

    if (status) {
      whereClause += ` AND o.status = $${paramCount}`;
      params.push(status);
      paramCount++;
    }

    if (search) {
      whereClause += ` AND (o.order_number ILIKE $${paramCount} OR c.email ILIKE $${paramCount})`;
      params.push(`%${search}%`);
      paramCount++;
    }

    // Get total count
    const countResult = await query<{ count: number }>(
      `SELECT COUNT(*) as count FROM orders o 
       LEFT JOIN customers c ON o.customer_id = c.id
       ${whereClause}`,
      params
    );
    const total = parseInt(countResult[0]?.count?.toString() || '0');

    // Get orders with customer info
    const orders = await query<Order>(
      `SELECT o.*, 
              c.email as customer_email,
              c.first_name as customer_first_name,
              c.last_name as customer_last_name
       FROM orders o
       LEFT JOIN customers c ON o.customer_id = c.id
       ${whereClause}
       ORDER BY o.created_at DESC
       LIMIT $${paramCount} OFFSET $${paramCount + 1}`,
      [...params, limit, offset]
    );

    return NextResponse.json({
      success: true,
      data: orders,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Orders GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
