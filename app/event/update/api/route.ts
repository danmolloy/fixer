import { Call } from '@prisma/client';
import { eventObj, updateEventandCalls } from './functions';

export async function POST(request: Request) {
  const req = await request.json();
  const {
    id,
    ensembleId,
    ensembleName,
    eventTitle,
    fixerId,
    concertProgram,
    confirmedOrOnHold,
    calls,
    dressCode,
    fee,
    additionalInfo,
  } = req;

  let updateEventArg = eventObj({
    id: req.id,
    ensembleId,
    ensembleName,
    eventTitle,
    fixerId,
    updatedAt: new Date(),
    concertProgram,
    confirmedOrOnHold,
    calls,
    dressCode,
    fee,
    additionalInfo,
    fixerName: null,
    //createdAt: new Date()
  });
  const callsArr: Call[] = calls;
  const data = await updateEventandCalls({
    eventObj: updateEventArg,
    callsArr,
  });
  return Response.json(data);
}
