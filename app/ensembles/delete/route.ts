import { deleteEnsemble } from './functions';

export async function POST(request: Request) {
  const req = await request.json();
  await deleteEnsemble(req.ensembleId);
  return new Response();
}
