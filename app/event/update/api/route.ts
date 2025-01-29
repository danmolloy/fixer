import { Call } from '@prisma/client';
import { eventObj, updateEventandCalls, updateEmailPlayers } from './functions';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const req = await request.json();
  const {
    id,
    updateMessage,
    ensembleId,
    ensembleName,
    eventTitle,
    fixerId,
    concertProgram,
    status,
    calls,
    dressCode,
    fee,
    additionalInfo,
    adminAccess
  } = req;

  let updateEventArg = eventObj({
    id: Number(id),
    ensembleId,
    ensembleName,
    eventTitle,
    fixerId,
    updatedAt: new Date(),
    concertProgram,
    status,
    calls,
    dressCode,
    fee,
    additionalInfo,
    adminAccess
    //createdAt: new Date()
  });
  const callsArr: Call[] = calls;

  try {
    const data = await updateEventandCalls({
      eventObj: updateEventArg,
      callsArr,
    });
    await updateEmailPlayers(data, updateMessage);
    return NextResponse.json({ ...data.event, success: true }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || 'An unexpected error occurred', success: false },
      { status: 500 }
    );
  }
}
