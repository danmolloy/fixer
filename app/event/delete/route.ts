import { deleteEvent } from "./functions"

export async function POST(request: Request) {
  const req = await request.json()
  await deleteEvent(Number(req.eventId))
  return new Response()

}
