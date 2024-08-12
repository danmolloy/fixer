import { createContact } from "./functions"

export async function POST(request: Request) {
  const req = await request.json()
  const data = await createContact(req)
  return Response.json(data)
}