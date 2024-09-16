import { deleteEventSection } from './functions';

export async function POST(request: Request) {
  const req = await request.json();
  await deleteEventSection(req.sectionId);
  return new Response();
}
