import { syncDriveFiles } from '@/services/db/drive';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  const nextPage = searchParams.get('nextPage') || '';

  try {
    const response = await syncDriveFiles(nextPage);
    return NextResponse.json(response, { status: 200 });
  } catch (e) {
    console.error('there was an error: ', e);
    return NextResponse.json(e, { status: 500 });
  }
};
