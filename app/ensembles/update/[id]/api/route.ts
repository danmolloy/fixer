import { NextResponse } from 'next/server';
import { updateEnsemble } from './functions';

export async function POST(request: Request) {
  const req = await request.json();

  try {
    const data = await updateEnsemble(req);
    return NextResponse.json({ ...data, success: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || 'An unexpected error occurred', success: false },
      { status: 500 }
    );
  }
}
