import { createEventSection } from './functions';

export async function POST(request: Request) {
  const req = await request.json();
  await createEventSection(req);
  return new Response();
}
