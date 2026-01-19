import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET() {
  try {
    // Check database connection
    await query('SELECT 1');

    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        api: 'ok',
        database: 'ok',
      },
      version: '1.0.0',
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        services: {
          api: 'ok',
          database: 'error',
        },
        error: 'Database connection failed',
      },
      { status: 503 }
    );
  }
}
