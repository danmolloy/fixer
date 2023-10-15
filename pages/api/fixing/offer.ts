import prisma from '../../../client'
import { RequestValues } from '../../../components/fixing/editCalls/editCalls'
import { twilioClient } from "../../../twilio"

import type { NextApiRequest, NextApiResponse } from 'next'
import { handleFixing, updatePlayerCall } from './bookingFunctions'




const handleOffer = async (playerCallId: number) => {
  const updateData = {
    bookingOrAvailability: "Booking",
    recieved: false,
    accepted: null
  }
  const updatedCall = await updatePlayerCall(playerCallId, updateData)
  await handleFixing(updatedCall.eventInstrumentId)
  }



export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    playerCallId  
  } = req.body

  
 res.status(200).json(await handleOffer(playerCallId))
  

}
