import { createContactMessages } from './functions';

export async function POST(request: Request) {
  const req = await request.json();
  console.log(JSON.stringify(req));
  await createContactMessages(req);
  return Response.json({ hello: 'world' });
}
