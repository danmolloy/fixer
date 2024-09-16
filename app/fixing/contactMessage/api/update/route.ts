import { updateContactMessage } from './functions';

export async function POST(request: Request) {
  const req = await request.json();
  const data = await updateContactMessage(req);
  return Response.json(data);
}
