import { createEnsemble } from './functions';

export async function POST(request: Request) {
  const req = await request.json();

  const newEnsemble = await createEnsemble(req);
  return Response.json(newEnsemble);
}
