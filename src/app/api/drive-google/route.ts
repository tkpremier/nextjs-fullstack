import { auth0 } from '@/lib/auth0';
import { listFiles } from '@/services/drive'; // The file you moved in Step 1
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const session = await auth0.getSession(request);
  // 1. Parse Query Params
  const { searchParams } = new URL(request.url);
  const nextPage = searchParams.get('nextPage') || undefined;
  const pageSize = Number(searchParams.get('pageSize')) || 1000;

  // 2. Call Google API (Server-to-Server)
  try {
    if (!session) {
      return NextResponse.json({ error: 'Failed to fetch drive files' }, { status: 401 });
    }
    const response = await listFiles(nextPage, pageSize);
    return NextResponse.json(response?.data || {});
  } catch (error) {
    console.error('Google Drive API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch drive files' }, { status: 500 });
  }
}
