import { updateSection } from './functions';

export async function POST(req: Request) {
  const data = await req.json();
  return Response.json(await updateSection(data));
}
