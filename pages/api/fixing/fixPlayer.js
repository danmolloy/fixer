import prisma from '../../../client'
import { twilioClient } from '../../../twilio'

const sendMessage = (musicianEmail) => {
  if (process.env.TWILIO_ACTIVE === "false") {
    return;
  }
  const msgBody = `Hi ${musicianEmail}, the fixer has accepted a gig on your behalf. Please contact them directly if you think this is an error.`;
  const MSS = 'MGa3507a546e0e4a6374af6d5fe19e9e16';
  const toNum = process.env.PHONE;
  return twilioClient.messages 
  .create({ 
     body: msgBody, 
     messagingServiceSid: MSS,      
     to: toNum 
   }) 
}

const handleFix = async (playerCallId, musicianEmail) => {
  return await prisma.playerCall.update({
    where: {
      id: playerCallId
    },
    data: {
      recieved: true,
      accepted: true,
    }
  }).then(() => sendMessage(musicianEmail))
}


export default async function handle(req, res) {
  const { 
    playerCallId,
    musicianEmail
  } = req.body 

  res.status(200).json({result: await handleFix(playerCallId, musicianEmail)})
}

export { handleFix, sendMessage };
