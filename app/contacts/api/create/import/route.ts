import { createContacts } from './functions';

export async function POST(request: Request) {
  const req = await request.json();
  console.log(req)
  //return Response.json({hello: "world"})
  const data = await createContacts(req.values);
  return Response.json({ hello: 'world' });
}
