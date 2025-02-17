import { NextResponse } from 'next/server';
import { updateManyContactMessage } from '../update/functions';

export async function POST(request: Request) {
  const req = await request.json();

  try {
    const data = await updateManyContactMessage({
      contactIDs: req.contactIDs,
      data: req.data,
    });
    return NextResponse.json({ ...data, success: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || 'An unexpected error occurred', success: false },
      { status: 500 }
    );
  }
}
