import { deleteContactMessage } from './functions';

export async function POST(request: Request) {
  const req = await request.json();

  const data = await deleteContactMessage(Number(req.contactMessageId));
  return Response.json(data);
}
