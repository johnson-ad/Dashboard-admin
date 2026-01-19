import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const coupons = await query(
      `SELECT * FROM coupons ORDER BY created_at DESC`
    );

    return NextResponse.json({
      success: true,
      data: coupons,
    });
  } catch (error) {
    console.error('Coupons GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
