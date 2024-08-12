import { createAdminInvite } from "./functions"

export async function POST(request: Request) {
  const req = await request.json()
  await createAdminInvite(req)
  return new Response()
}