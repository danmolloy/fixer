import { NextResponse } from 'next/server';
import { joinEnsemble } from './functions';

export async function POST(request: Request) {
  const req = await request.json();
  try {
    const admin = await joinEnsemble(req);
    return NextResponse.json({admin, success: true}, {status: 201});
  } catch(e: any) {
    return NextResponse.json({error: e.message || "An unexpected error occurred", success: false}, {status: 500});
  }
}
