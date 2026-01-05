import { listFiles } from '@/services/drive'; // The file you moved in Step 1
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // 1. Parse Query Params
  const { searchParams } = new URL(request.url);
  const nextPage = searchParams.get('nextPage') || undefined;
  const pageSize = Number(searchParams.get('pageSize')) || 1000;

  // 2. Call Google API (Server-to-Server)
  try {
    const response = await listFiles(nextPage, pageSize);
    return NextResponse.json(response?.data || {});
  } catch (error) {
    console.error('Google Drive API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch drive files' }, { status: 500 });
  }
}
