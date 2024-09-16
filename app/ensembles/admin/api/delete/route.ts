import { deleteAdmin } from './functions';

export async function POST(request: Request) {
  const req = await request.json();
  await deleteAdmin(req);
  return new Response();
}
