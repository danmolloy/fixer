import { updateContactIndex } from "./functions"

export async function POST(request: Request) {
  const req = await request.json()
  
  const data = await updateContactIndex(req)
  return Response.json(data)
}