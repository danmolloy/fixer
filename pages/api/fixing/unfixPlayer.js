import { twilioClient } from "../../../twilio"
import prisma from '../../../client'

const updatePlayerCall = async (playerCallId) => {
  return await prisma.playerCall.update({
    where: {
      id: playerCallId
    },
    data: {
      recieved: true,
      accepted: false
    }
  })
}

const sendMessage = (musicianEmail) => {
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

const updateAndMessage = async (playerCallId, musicianEmail) => {
  return await updatePlayerCall(playerCallId)
  .then(() => sendMessage(musicianEmail))
}

export default async function handle(req, res) {
  const { 
    playerCallId,
    musicianEmail
  } = req.body 
  console.log(musicianEmail)

    res.status(200).json(await updateAndMessage(playerCallId, musicianEmail))

  }