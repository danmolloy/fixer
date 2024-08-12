import { joinEnsemble } from "./functions"

export async function POST(request: Request) {
  const req = await request.json()
  await joinEnsemble(req)
  return new Response()
}