import { NextResponse } from 'next/server';
import { createEvent, eventObj } from './functions';

export async function POST(request: Request) {
  const req = await request.json();
  const {
    fixerId,
    ensembleName,
    ensembleId,
    eventTitle,
    concertProgram,
    confirmedOrOnHold,
    calls,
    dressCode,
    fee,
    additionalInfo,
  } = req;

  let createEventArg = eventObj({
    ensembleId,
    eventTitle,
    ensembleName,
    concertProgram,
    confirmedOrOnHold,
    calls,
    fixerId: fixerId,
    dressCode,
    fee,
    additionalInfo,
  });

  try {
    const data = await createEvent(createEventArg);
    return NextResponse.json({ ...data, success: true }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || 'An unexpected error occurred', success: false },
      { status: 500 }
    );
  }
}
