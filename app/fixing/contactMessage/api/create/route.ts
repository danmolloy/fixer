import { NextResponse } from 'next/server';
import { createContactMessages } from './functions';

export async function POST(request: Request) {
  const req = await request.json();
  //console.log(JSON.stringify(req));
  try {
    await createContactMessages(req)
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || 'An unexpected error occurred', success: false },
      { status: 500 }
    );
  }
}
