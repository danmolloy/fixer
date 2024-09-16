import { createEnsemble } from './functions';

export async function POST(request: Request) {
  const req = await request.json();

  await createEnsemble(req);
  return new Response();
}
