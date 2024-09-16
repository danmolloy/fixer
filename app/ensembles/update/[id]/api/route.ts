import { updateEnsemble } from './functions';

export async function POST(request: Request) {
  const req = await request.json();

  await updateEnsemble(req);
  return new Response();
}
