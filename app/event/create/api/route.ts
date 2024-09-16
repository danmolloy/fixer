import { createEvent, eventObj } from './functions';

export async function POST(request: Request) {
  const req = await request.json();
  const {
    fixerId,
    fixerName,
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
    fixerName: fixerName,
    dressCode,
    fee,
    additionalInfo,
  });

  const data = await createEvent(createEventArg);
  return Response.json(data);
}
