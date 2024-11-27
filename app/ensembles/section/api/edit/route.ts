import { NextResponse } from 'next/server';
import { updateSection } from './functions';

export async function POST(request: Request) {
  const req = await request.json();

  try {
    const data = await updateSection(req);
    return NextResponse.json({ ...data, success: true }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || 'An unexpected error occurred', success: false },
      { status: 500 }
    );
  }
}
