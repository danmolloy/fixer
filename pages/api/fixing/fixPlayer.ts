import { twilioClient } from "../../../twilio"
import prisma from '../../../client'

const updatePlayerCall = async (playerCallId) => {
  const playerCall = await prisma.playerCall.update({
      where: {
        id: playerCallId
      },
      data: {
        recieved: true,
        accepted: true
      },
      include: {
        musician: true
      }
    })

    return playerCall;
}

const sendMessage = (res) => {
  if (process.env.TWILIO_ACTIVE === "false") {
    return;
  }
  const msgBody = `Hi ${res.musician.name}, the Dan Molloy has accepted ${res.id} on your behalf. Please contact them directly if you think this is an error.`;
  const MSS = 'MGa3507a546e0e4a6374af6d5fe19e9e16';
  const toNum = process.env.PHONE
  return twilioClient.messages 
  .create({ 
     body: msgBody, 
     messagingServiceSid: MSS,      
     to: toNum 
   }) 
}

const updateAndMessage = async (playerCallId) => {
  return await updatePlayerCall(playerCallId)
  .then((res) => sendMessage(res))
}

export default async function handle(req, res) {
  const { 
    playerCallId,
  } = req.body

    res.status(200).json(await updateAndMessage(playerCallId))

  }