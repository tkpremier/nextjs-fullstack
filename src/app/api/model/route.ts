import { createModel, getAllModels } from '@/services/db/model';
import { NextResponse } from 'next/server';

export const GET = async _req => {
  try {
    const { data } = await getAllModels();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: {}, error: error }, { status: 500 });
  }
};

export const POST = async req => {
  const body = await req.json();
  try {
    const { rows: data } = await createModel(body);
    if (data[0] === undefined) {
      throw new Error('Interview not added');
    }
    return NextResponse.json({ data: data[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: {}, error: error }, { status: 500 });
  }
};
