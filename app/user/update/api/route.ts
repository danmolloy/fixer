import { redirect } from 'next/navigation';
import { updateUser } from './functions';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const req = await request.json();

  await updateUser(req);
  return new Response(redirect('/'));

  /* try {
    const data = await updateUser(req);
    return NextResponse.redirect(new URL('/', request.url))
  } catch(e: any) {
    return NextResponse.json({error: e.message || "An unexpected error occurred", success: false}, {status: 500});
  } */
}
