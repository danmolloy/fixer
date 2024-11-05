import { archiveContact } from './functions';

export async function POST(request: Request) {
  const req = await request.json();
  const data = await archiveContact(req);
  return Response.json(data);
}
