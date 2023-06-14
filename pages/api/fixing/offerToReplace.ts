import prisma from '../../../client'
import { RequestValues } from '../../../components/fixing/editCalls/editCalls'
import { twilioClient } from "../../../twilio"

import type { NextApiRequest, NextApiResponse } from 'next'

// Get Event
// Put call out
// Replacing 
// Send offer



const handleOffer = async (offerObj) => {
  updatePlayerCall(offerObj)
}

const updatePlayerCall = async(offerObj) => {
  // Player to Dep, 
  // Send message
  let playerCall = await prisma.playerCall.update({
    where: {
      id: offerObj.playerCallIdToStepIn
    },
    data: {
      toDepPlayerCallId: offerObj.playerCallIdToRemove,
      recieved: false,
      accepted: null
    },
    include: {
      musician: true
    }
  })

  sendTextMessage(playerCall)

}

const updateReceived = async (playerCallId) => {
  let playerCall = await prisma.playerCall.update({
    where: {
      id: playerCallId
    },
    data: {
      recieved: true,
    },
  })
  return playerCall
}

const sendTextMessage = async (playerCall) => {

  const msgBody = `Hi ${playerCall.musician.name}, 
  Dan Molloy ${playerCall.bookingOrAvailability === "Booking" ? "offers:" : "checks availability for:"} 
  
  ${process.env.NGROK_URL}/event/${playerCall.eventId}

  ${playerCall.messageToAll !== "" ? `\n Dan says to all ${playerCall.instrumentName} players for this gig: "${playerCall.messageToAll}"` : ""}

  ${playerCall.playerMessage !== null ? `\n Dan says to you: "${playerCall.playerMessage}"`: ""}

  Reply YES ${playerCall.id} to accept or NO ${playerCall.id} to decline. 
  
  For other options, contact Dan directly.
`

  twilioClient.messages 
          .create({ 
             body: msgBody,  
             messagingServiceSid: 'MGa3507a546e0e4a6374af6d5fe19e9e16',      
             to: process.env.PHONE 
           }) 
          .then(message => console.log(message.sid))
          .then(async () => await updateReceived(Number(playerCall.id)))
          .done();
  return;
}



export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    playerCallId,
    playerCallIdToRemove,
    playerCallIdToStepIn
  } = req.body

  const offerObj = {
    playerCallId,
    playerCallIdToRemove,
    playerCallIdToStepIn
  }

  
 res.status(200).json(await handleOffer(offerObj))
  

}
