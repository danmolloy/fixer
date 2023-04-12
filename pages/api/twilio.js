const accountSid = process.env.TWILIO_ACCOUNTSID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const client = require('twilio')(accountSid, authToken); 
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

 
export default async function handle(req, res) {

  let eventInstrument = await prisma.eventInstrument.findUnique({
    where: {
      id: req.body[0].eventInstrumentId,
    },
    include: {
      musicians: true
    }
  })

  console.log(`Calls Out: ${eventInstrument.musicians
  .filter(i => i.recieved === true).length}`)
  console.log(`Num to book: ${eventInstrument.numToBook}`)

  
  if (eventInstrument.musicians
    .filter(i => i.recieved === true)
    .filter(i => i.accepted === true || i.accepted === null).length 
    === eventInstrument.numToBook) {
      console.log("in the net")
      res.status(200).json({response: "Max number of calls out"})

    } else {
      for (let i = 0; i < req.body.length; i ++) {
        client.messages 
          .create({ 
             body: req.body[i].body,  
             messagingServiceSid: 'MGa3507a546e0e4a6374af6d5fe19e9e16',      
             to: '+447479016386' 
           }) 
          .then(message => console.log(message.sid))
          .then(async () => await prisma.playerCall.update({
            where: {
              id: Number(req.body[i].callId)
            },
            data: {
              recieved: true
            }
          }))
          .done();
      }
      res.status(200).json({response: "Hello from Twilio"})
    }

}