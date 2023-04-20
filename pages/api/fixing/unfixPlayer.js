import { twilioClient } from "../../../twilio"
import prisma from '../../../client'

const updatePlayerCall = async (playerCallId, remove, fixOrUnfix) => {

  if (remove === true) {
    return await prisma.playerCall.delete({
      where: {
        id: playerCallId
      }
    })
  } else {
    return await prisma.playerCall.update({
      where: {
        id: playerCallId
      },
      data: {
        recieved: true,
        accepted: fixOrUnfix
      }
    })
  }
  
}

const sendMessage = (musicianEmail) => {
  if (process.env.TWILIO_ACTIVE === "false") {
    return;
  }
  const msgBody = `Hi ${musicianEmail}, the fixer has declined a gig on your behalf. Please contact them directly if you think this is an error.`;
  const MSS = 'MGa3507a546e0e4a6374af6d5fe19e9e16';
  const toNum = process.env.PHONE
  
  return twilioClient.messages 
  .create({ 
     body: msgBody, 
     messagingServiceSid: MSS,      
     to: toNum 
   }) 
}

const updateAndMessage = async (playerCallId, musicianEmail, remove, fixOrUnfix) => {
  return await updatePlayerCall(playerCallId, remove, fixOrUnfix)
  .then(() => sendMessage(musicianEmail))
}

export default async function handle(req, res) {
  const { 
    playerCallId,
    musicianEmail,
    remove,
    fixOrUnfix
  } = req.body

    res.status(200).json(await updateAndMessage(playerCallId, musicianEmail, remove, fixOrUnfix))

  }