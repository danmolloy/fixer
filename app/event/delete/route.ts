import { deleteEmailPlayers, deleteEvent } from './functions';

export async function POST(request: Request) {
  const req = await request.json();
  const deletedGigData = await deleteEvent(Number(req.eventId));
  await deleteEmailPlayers(deletedGigData, req.message)
  return new Response();
}
