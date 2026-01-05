import { createInterview, updateInterview } from '@/services/db/interview';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const body = await request.json();
  try {
    const { data, error } = await updateInterview([body.company, body.date, body.retro, body.id]);
    if (data[0] === undefined) {
      throw error;
    }
    return NextResponse.json({ data: data[0] }, { status: 200 });
  } catch (error) {
    throw error;
    // return NextResponse.json({ data: {}, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const { data } = await createInterview([body.company, body.retro, body.date]);
    if (data[0] === undefined) {
      throw new Error('Interview not added');
    }
    return NextResponse.json({ data: data[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ data: {}, error: error }, { status: 500 });
  }
}
