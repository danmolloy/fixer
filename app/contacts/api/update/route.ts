import { updateContact } from './functions';

export async function POST(request: Request) {
  const req = await request.json();
  const data = await updateContact(req);
  return Response.json(data);
}
