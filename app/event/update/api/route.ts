import { Call } from '@prisma/client';
import { eventObj, updateEventandCalls, updateEmailPlayers } from './functions';

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
    //createdAt: new Date()
  });
  const callsArr: Call[] = calls;
  const data = await updateEventandCalls({
    eventObj: updateEventArg,
    callsArr,
  });
  await updateEmailPlayers(data, updateMessage)
  return Response.json(data);
}
