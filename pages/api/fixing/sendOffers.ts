import prisma from '../../../client'
import { RequestValues } from '../../../components/fixing/editCalls/editCalls'
import { twilioClient } from "../../../twilio"

import type { NextApiRequest, NextApiResponse } from 'next'
import { createPlayerCall, getEventInstrumentAndMusicians, handleFixing, updateEventInstrument } from './bookingFunctions'


export const handleBooking = async (instrumentObj: RequestValues) => {
  let arr: any = []
  let instrumentData = {
    callOrder: instrumentObj.callOrder,
    numToBook: Number(instrumentObj.numToBook),
    messageToAll: instrumentObj.messageToAll,
    fixerNote: instrumentObj.fixerNote,
  }
  let eventInstrument = await updateEventInstrument(instrumentObj.eventInstrumentId, instrumentData)

  // Add players to call list on DB
  if (instrumentObj.musicians.length > 0) {
    for (let i = 0; i < instrumentObj.musicians.length; i++) {

      if (eventInstrument.musicians.find(j => String(j.id) === instrumentObj.musicians[i].musicianId) === undefined) {
        arr = [...arr, await createPlayerCall({
            musicianId: instrumentObj.musicians[i].musicianId,
            eventInstrumentId: Number(instrumentObj.eventInstrumentId),
            playerMessage: instrumentObj.musicians[i].playerMessage,
            offerExpiry: instrumentObj.musicians[i].offerExpiry,
            bookingOrAvailability: instrumentObj.bookingOrAvailability,
            calls: {
              connect: instrumentObj.musicians[i].callsOffered
            }
          }
        )]
      } else {
        console.log(`${instrumentObj.musicians[i].musicianEmail} already on call list`)
      }
    }
}

  await handleFixing(eventInstrument.id)

}




export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    eventId, //
    musicians,
    //callsOutId,
    eventInstrumentId, //
    callOrder,
    numToBook,
    bookingOrAvailability,
    messageToAll, //
    fixerNote, //
    bookingStatus, //
  } = req.body

  const instrumentObj: RequestValues = {
    eventId,
    musicians,
    eventInstrumentId,
    numToBook,
    callOrder,
    bookingOrAvailability,
    messageToAll,
    fixerNote,
    bookingStatus,
  }


  
 res.status(200).json(await handleBooking(instrumentObj))
  

}