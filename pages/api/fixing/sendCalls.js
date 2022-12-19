import { twilioClient } from "../../../twilio"
import prisma from '../../../client'

const findInstrument = async (id) => {
  return await prisma.eventInstrument.findUnique({
    where: {
      id: id,
    },
    include: {
      musicians: true
    }
  })
}

const updatePlayer = async(id) => {
  return await prisma.playerCall.update({
    where: {
      id: id
    },
    data: {
      recieved: true
    }
  })
}

const sendMessages = async (reqBody) => {

  const eventInstrument = await findInstrument(reqBody[0].eventInstrumentId)
  if (eventInstrument.musicians
    .filter(i => i.recieved === true)
    .filter(i => i.accepted === true || i.accepted === null).length 
    === eventInstrument.numToBook) {
      res.status(200).json({response: "Max number of calls out"})
    } else {
      for (let i = 0; i < reqBody.length; i ++) {
        twilioClient.messages 
          .create({ 
             body: reqBody[i].body,  
             messagingServiceSid: 'MGa3507a546e0e4a6374af6d5fe19e9e16',      
             to: '+447479016386' 
           }) 
          .then(message => console.log(message.sid))
          .then(async () => await updatePlayer(Number(reqBody[i].callId)))
          .done();
      }
    }
}
 
export default async function handle(req, res) {
  res.status(200).json(await sendMessages(req.body))
}
