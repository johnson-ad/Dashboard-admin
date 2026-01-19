import { NextRequest, NextResponse } from 'next/server';
import { query, queryOne } from '@/lib/db';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { name, slug, description, is_active } = body;

    const result = await query(
      `UPDATE categories SET
        name = $1,
        slug = $2,
        description = $3,
        is_active = $4,
        updated_at = NOW()
      WHERE id = $5
      RETURNING *`,
      [name, slug, description, is_active, params.id]
    );

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error('Category PUT error:', error);
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
    await query('DELETE FROM categories WHERE id = $1', [params.id]);

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error('Category DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
