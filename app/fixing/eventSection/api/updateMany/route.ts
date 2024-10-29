import { updateAllEventSections } from '../update/functions';

export async function POST(request: Request) {
  const req = await request.json();
  await updateAllEventSections(req.eventId, req.data);
  return new Response();
}
