import prisma from '../../../client'
import { twilioClient } from "../../../twilio"


const getEventInstrument = async (eventInstrumentId) => {
  
  let callsOut = await prisma.eventInstrument.findUnique({
    where: {
      id: eventInstrumentId
    },
    include: {
      musicians: true
    }
  })
  return callsOut
}

const updateEventDetails = async (instrumentObj) => {
  let updatedEventInstrument = await prisma.eventInstrument.update({
    where: {
      id: instrumentObj.eventInstrumentId
    },
    data: {
      callOrder: instrumentObj.callOrder,
      numToBook: Number(instrumentObj.numToBook),
    },
    include: {
      musicians: true
    }
  })

  return updatedEventInstrument;

}

const handleBooking = async (instrumentObj) => {
  let arr = []
  let eventInstrument = await updateEventDetails(instrumentObj)
  //console.log(`eventInstrument: ${JSON.stringify(eventInstrument)}`)

  // Add players to call list on DB
  if (instrumentObj.musicians.length > 0) {
    for (let i = 0; i < instrumentObj.musicians.length; i++) {

      if (eventInstrument.musicians.find(j => j.musicianEmail === instrumentObj.musicians[i].musicianEmail) === undefined) {
        arr = [...arr, await prisma.playerCall.create({
          data: {
            musicianEmail: instrumentObj.musicians[i].musicianEmail,
            eventInstrumentId: instrumentObj.musicians[i].eventInstrumentId,
            calls: {
              connect: instrumentObj.musicians[i].callsOffered
            }
          }
        })]
      } else {
        console.log(`${instrumentObj.musicians[i].musicianEmail} already on call list`)
      }
    }
}
  
  makeCalls(instrumentObj.eventInstrumentId)
  return arr;
}


const numToCall = (eventInstrument) => {
  let activeCallsAndBookedLength = eventInstrument.musicians.filter(i => i.recieved === true && i.accepted !== false).length
  let numToCall = eventInstrument.numToBook - activeCallsAndBookedLength
  return numToCall
}

const makeCalls = async (eventInstrumentId) => {
  let eventInstrument = await getEventInstrument(eventInstrumentId)
  let numCalls = numToCall(eventInstrument)

  for (let i = 0; i < numCalls; i++) {
// Needs to state whether booking or availability
    twilioClient.messages 
          .create({ 
             body: `Hi ${eventInstrument.musicians[i].musicianEmail}, Dan Molloy offers ${process.env.NGROK_URL}/event/${eventInstrument.eventId} Reply YES ${eventInstrument.musicians[i].id} or NO ${eventInstrument.musicians[i].id}.`,  
             messagingServiceSid: 'MGa3507a546e0e4a6374af6d5fe19e9e16',      
             to: process.env.PHONE 
           }) 
          .then(message => console.log(message.sid))
          .then(async () => await updatePlayer(eventInstrument.musicians[i].id))
          .done();
  }

}

const updatePlayer = async(callId) => {
  // Needs to state whether booking or availability
    let updateRecieved = await prisma.playerCall.update({
      where: {
        id: callId
      },
      data: {
        recieved: true
      }
    })

    return updateRecieved; 
}


export default async function handle(req, res) {
  const {
    musicians,
    callsOutId,
    callOrder,
    numToBook,
    bookingOrAvailability
  } = req.body

  const musiciansArr = musicians.map(i => ({
    musicianEmail: i.musicianEmail,
    callsOffered: i.callsOffered.map(j => ({
      id: j
    })),
    eventInstrumentId: callsOutId,
  }))

  const instrumentObj = {
    eventInstrumentId: callsOutId,
    callOrder: callOrder,
    numToBook: numToBook,
    bookingOrAvailability: bookingOrAvailability,
    musicians: musiciansArr
  }

 //console.log(instrumentObj)


  
  res.status(200).json(await handleBooking(instrumentObj))
  

}
