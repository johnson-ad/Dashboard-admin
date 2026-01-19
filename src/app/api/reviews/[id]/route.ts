import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { is_approved, is_verified } = body;

    const result = await query(
      `UPDATE reviews SET
        is_approved = COALESCE($1, is_approved),
        is_verified = COALESCE($2, is_verified),
        updated_at = NOW()
      WHERE id = $3
      RETURNING *`,
      [is_approved, is_verified, params.id]
    );

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error('Review PUT error:', error);
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
    await query('DELETE FROM reviews WHERE id = $1', [params.id]);

    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    console.error('Review DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
