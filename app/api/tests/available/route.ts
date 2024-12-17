import { NextResponse } from 'next/server';
import { findCypressTests } from '@/lib/test-utils';

export async function GET() {
  try {
    const tests = await findCypressTests();
    return NextResponse.json({ tests });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch available tests' },
      { status: 500 }
    );
  }
}