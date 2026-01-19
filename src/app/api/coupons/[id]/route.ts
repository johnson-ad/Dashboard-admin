import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const {
      code,
      description,
      discount_type,
      discount_value,
      minimum_order_amount,
      usage_limit,
      valid_from,
      valid_until,
      is_active,
    } = body;

    const result = await query(
      `UPDATE coupons SET
        code = $1,
        description = $2,
        discount_type = $3,
        discount_value = $4,
        minimum_order_amount = $5,
        usage_limit = $6,
        valid_from = $7,
        valid_until = $8,
        is_active = $9,
        updated_at = NOW()
      WHERE id = $10
      RETURNING *`,
      [
        code,
        description,
        discount_type,
        discount_value,
        minimum_order_amount,
        usage_limit,
        valid_from,
        valid_until,
        is_active,
        params.id,
      ]
    );

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error('Coupon PUT error:', error);
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
    await query('DELETE FROM coupons WHERE id = $1', [params.id]);

    return NextResponse.json({
      success: true,
      message: 'Coupon deleted successfully',
    });
  } catch (error) {
    console.error('Coupon DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
