import type { NextApiRequest, NextApiResponse } from 'next'
import { handleFixing } from './bookingFunctions'
import { updatePlayerCall } from './bookingFunctions/prismaFunctions'


export const handleOffer = async (playerCallId: number) => {
  const updateData = {
    bookingOrAvailability: "Booking",
    recieved: false,
    accepted: null
  }
  const updatedCall = await updatePlayerCall(playerCallId, updateData)
  await handleFixing(updatedCall.eventSectionId)
  }



export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    playerCallId  
  } = req.body

  
 res.status(200).json(await handleOffer(playerCallId))
  

}
