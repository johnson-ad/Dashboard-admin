import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await queryOne(
      'SELECT * FROM products WHERE id = $1',
      [params.id]
    );

    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Product GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      sku,
      price,
      compare_at_price,
      category_id,
      stock_quantity,
      description,
      short_description,
      is_active,
      is_featured,
    } = body;

    const result = await query(
      `UPDATE products SET
        name = $1,
        slug = $2,
        sku = $3,
        price = $4,
        compare_at_price = $5,
        category_id = $6,
        stock_quantity = $7,
        description = $8,
        short_description = $9,
        is_active = $10,
        is_featured = $11,
        updated_at = NOW()
      WHERE id = $12
      RETURNING *`,
      [
        name,
        slug,
        sku,
        price,
        compare_at_price,
        category_id,
        stock_quantity,
        description,
        short_description,
        is_active,
        is_featured,
        params.id,
      ]
    );

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error('Product PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await query('DELETE FROM products WHERE id = $1', [params.id]);

    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Product DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
