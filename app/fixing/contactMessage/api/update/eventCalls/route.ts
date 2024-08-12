import { updateContactEventCalls } from "./functions"

export async function POST(request: Request) {
  const req = await request.json()
  const data = await updateContactEventCalls(req)
  return Response.json(data)
}