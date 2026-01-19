import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { verifyAccessToken } from '@/lib/auth';
import { InputSanitizer } from '@/lib/security';
import { Product } from '@/types';

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
    const search = searchParams.get('search') || '';
    const categoryId = searchParams.get('categoryId');
    const isActive = searchParams.get('isActive');

    const offset = (page - 1) * limit;

    // Build query
    let whereClause = 'WHERE 1=1';
    const params: any[] = [];
    let paramCount = 1;

    if (search) {
      whereClause += ` AND (name ILIKE $${paramCount} OR sku ILIKE $${paramCount})`;
      params.push(`%${search}%`);
      paramCount++;
    }

    if (categoryId) {
      whereClause += ` AND category_id = $${paramCount}`;
      params.push(categoryId);
      paramCount++;
    }

    if (isActive !== null && isActive !== undefined) {
      whereClause += ` AND is_active = $${paramCount}`;
      params.push(isActive === 'true');
      paramCount++;
    }

    // Get total count
    const countResult = await query<{ count: number }>(
      `SELECT COUNT(*) as count FROM products ${whereClause}`,
      params
    );
    const total = parseInt(countResult[0]?.count?.toString() || '0');

    // Get products
    const products = await query<Product>(
      `SELECT p.*, c.name as category_name 
       FROM products p
       LEFT JOIN categories c ON p.category_id = c.id
       ${whereClause}
       ORDER BY p.created_at DESC
       LIMIT $${paramCount} OFFSET $${paramCount + 1}`,
      [...params, limit, offset]
    );

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Products GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    const payload = verifyAccessToken(token || '');
    if (!payload || payload.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      name,
      slug,
      description,
      sku,
      price,
      categoryId,
      stockQuantity,
      images,
    } = body;

    // Validation
    if (!name || !sku || !price) {
      return NextResponse.json(
        { error: 'Name, SKU, and price are required' },
        { status: 400 }
      );
    }

    // Insert product
    const result = await query<Product>(
      `INSERT INTO products 
       (name, slug, description, sku, price, category_id, stock_quantity, images)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        name,
        slug || name.toLowerCase().replace(/\s+/g, '-'),
        description,
        sku,
        price,
        categoryId,
        stockQuantity || 0,
        JSON.stringify(images || []),
      ]
    );

    // Log activity
    await query(
      'INSERT INTO activity_logs (user_id, action, entity_type, entity_id) VALUES ($1, $2, $3, $4)',
      [payload.userId, 'create_product', 'product', result[0].id]
    );

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error('Products POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
