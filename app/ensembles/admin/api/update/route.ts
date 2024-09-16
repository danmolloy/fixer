import { updateAdmin } from './functions';

export async function POST(request: Request) {
  const req = await request.json();
  await updateAdmin(req);
  return new Response();
}
