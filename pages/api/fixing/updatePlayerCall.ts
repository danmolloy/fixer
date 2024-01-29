import { handleFixing } from "./bookingFunctions"
import { updatePlayerCall } from "./bookingFunctions/prismaFunctions"

export const handleUpdate = async (playerCallId: number, data: {}): Promise<any> => {
  const playerCall = await updatePlayerCall(playerCallId, data)
  await handleFixing(playerCall.eventSectionId)
  //return await updatePlayerCall(playerCallId, data)
}

export default async function handle(req, res) {
  const { 
    playerCallId,
    data
  } = req.body

  res.status(200).json(await handleUpdate(playerCallId, data))

  }