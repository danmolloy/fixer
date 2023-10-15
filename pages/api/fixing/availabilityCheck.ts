import prisma from '../../../client'
import { AvailabilityRequestValues } from '../../../components/fixing/editCalls/editCalls'
import { twilioClient } from "../../../twilio"

import type { NextApiRequest, NextApiResponse } from 'next'
import { createPlayerCall, handleFixing, updateEventInstrument } from './bookingFunctions'




const handleCheck = async (instrumentObj: AvailabilityRequestValues) => {
  const updateData = {
    callOrder: "Ordered",
    messageToAll: instrumentObj.messageToAll,
  }
  let eventInstrument = await updateEventInstrument(instrumentObj.eventInstrumentId, updateData)

  if (instrumentObj.musicians.length > 0) {
    for (let i = 0; i < instrumentObj.musicians.length; i++) {

      if (eventInstrument.musicians.find(j => String(j.id) === instrumentObj.musicians[i].musicianId) === undefined) {
        await createPlayerCall({
            //musicianEmail: instrumentObj.musicians[i].musicianEmail,
            offerExpiry: 0,
            musicianId: instrumentObj.musicians[i].musicianId,
            eventInstrumentId: Number(instrumentObj.eventInstrumentId),
            playerMessage: instrumentObj.musicians[i].playerMessage,
            bookingOrAvailability: instrumentObj.bookingOrAvailability,
            calls: {
              connect: instrumentObj.musicians[i].callsOffered
            }
        })
      } else {
        console.log(`${instrumentObj.musicians[i].musicianEmail} already on call list`)
      }
    }
}

  await handleFixing(instrumentObj.eventInstrumentId)

}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    eventId,
    musicians,
    eventInstrumentId,
    messageToAll,
    bookingOrAvailability,
    bookingStatus,
  } = req.body;

  const instrumentObj: AvailabilityRequestValues = {
    eventId,
    musicians,
    eventInstrumentId,
    bookingOrAvailability,
    messageToAll,
    bookingStatus,
  }
  
 res.status(200).json(await handleCheck(instrumentObj));
  

}

export { handleCheck }