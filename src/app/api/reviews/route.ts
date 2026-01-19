import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const reviews = await query(
      `SELECT * FROM reviews ORDER BY created_at DESC LIMIT 100`
    );

    return NextResponse.json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.error('Reviews GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
