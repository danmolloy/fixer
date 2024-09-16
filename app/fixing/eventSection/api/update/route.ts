import { updateEventSection } from './functions';

export async function POST(request: Request) {
  const req = await request.json();
  await updateEventSection(req);
  return new Response();
}
