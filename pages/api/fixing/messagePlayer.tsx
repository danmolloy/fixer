import { twilioClient } from "../../../twilio"
import type { NextApiRequest, NextApiResponse } from 'next'


export const mockFunction = () => {
  return 1;
}

export const messagePlayer = (message) => {
  if (process.env.TWILIO_ACTIVE === "false" && process.env.NODE_ENV !== "test") {
    console.log("Twilio not active")
    return;
  }

  const MSS = 'MGa3507a546e0e4a6374af6d5fe19e9e16';
  const toNum = process.env.PHONE
  
  return twilioClient.messages 
  .create({ 
     body: message, 
     messagingServiceSid: MSS,      
     to: toNum 
   }) 
}


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    message
  } = req.body

  res.status(200).json(await messagePlayer(message))
  

}
