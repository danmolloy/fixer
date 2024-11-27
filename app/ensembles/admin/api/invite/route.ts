import axios from 'axios';
import { createAdminInvite } from './functions';
import { NextResponse } from 'next/server';

const url = `${process.env.URL}`;

export async function POST(request: Request) {
  const req = await request.json();

  try {
    const data = await createAdminInvite(req);
    return NextResponse.json({...data, success: true}, {status: 201});
  } catch(e: any) {
    return NextResponse.json({error: e.message || "An unexpected error occurred", success: false}, {status: 500});
  }
}
