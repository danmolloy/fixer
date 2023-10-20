import type { NextApiRequest, NextApiResponse } from 'next'
import { handleFixing } from './bookingFunctions'
import { createPlayerCall, updateEventInstrument } from './bookingFunctions/prismaFunctions'
import { InstrumentFormProps } from '../../../components/fixing/instrument/edit'

export const handleBooking = async (instrumentObj: InstrumentFormProps) => {
  let instrumentData = {
    callOrder: instrumentObj.callOrder,
    numToBook: Number(instrumentObj.numToBook),
    messageToAll: instrumentObj.messageToAll,
  }
  let eventInstrument = await updateEventInstrument(instrumentObj.eventInstrumentId, instrumentData)

  // Add players to call list on DB
  if (instrumentObj.musicians.length > 0) {
    for (let i = 0; i < instrumentObj.musicians.length; i++) {

      if (eventInstrument.musicians.find(j => String(j.id) === instrumentObj.musicians[i].user.id) === undefined) {
        await createPlayerCall({
            musicianId: instrumentObj.musicians[i].user.id,
            eventInstrumentId: Number(instrumentObj.eventInstrumentId),
            playerMessage: instrumentObj.musicians[i].addedMessage,
            offerExpiry: 0,
            bookingOrAvailability: instrumentObj.bookingOrAvailability,
            calls: {
              connect: instrumentObj.musicians[i].calls.map(i => ({id: i.id}))
            }
          }
        )
      } else {
        console.log(`${instrumentObj.musicians[i].user.name} already on call list`)
      }
    }
}

  await handleFixing(eventInstrument.id)

}




export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  
 res.status(200).json(await handleBooking(req.body))
  

}