import { deleteDriveFile, getFile, updateFile } from '@/services/drive';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request, { params }: { params: Promise<{ driveId: string }> }) {
  const { driveId } = await params;
  try {
    if (!driveId) {
      throw new Error('Drive ID is required');
    }
    const { name, description } = await request.json();
    const response = await updateFile(driveId, { name, description });
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error('updateDriveFileApi error: ', error);
    return NextResponse.json({ error: `Failed to update drive file: ${error.message}` }, { status: 500 });
  }
}

export async function GET(_req: Request, { params }: { params: Promise<{ driveId: string }> }) {
  const { driveId } = await params;
  try {
    const data = await getFile(driveId);
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.error('getFileApi error: ', e);
    return NextResponse.json({ error: `Failed to get drive file: ${e.message}` }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ driveId: string }> }) {
  const { driveId } = await params;
  try {
    const data = await deleteDriveFile(driveId);
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.error('deleteDriveFileApi error: ', e);
    return NextResponse.json({ error: `Failed to delete drive file: ${e.message}` }, { status: 500 });
  }
}
