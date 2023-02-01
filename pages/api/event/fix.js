import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

/* numToBook currently read when creating eventInstrument only */

export default async function handle(req, res) {
  const { 
    eventId, 
    instrumentName,
    musicians,
    callsOutId,
    callOrder,
    numToBook
  } = req.body 

  let currentCalls;

  if (callsOutId !== null) {
    const result = await prisma.eventInstrument.update({
      where: {id: callsOutId},
      data: {
        musicians: {
        createMany: {
          data: [...musicians] // I think here is where to do individualplayercalls...
        }
      }
    },
    include: {
      musicians: true,
      event: true
    }
    })

    if (callOrder === "simultaneous") {
      currentCalls = result.musicians.map(i => ({
        eventInstrumentId: result.id,
        callId: i.id,
        name: i.musicianEmail,
        number: process.env.PHONE,
        body: `Hi ${i.musicianEmail}, you have been offered the following gig: ${process.env.NGROK_URL}/event/${result.event.id} \n Respond "YES ${i.id}" to accept or "NO ${i.id}" to decline.`
      }))
    } else {
      currentCalls = result.musicians.slice(0, result.numToBook).map(i => ({
        eventInstrumentId: result.id,
        callId: i.id,
        name: i.musicianEmail,
        number: process.env.PHONE,
        body: `Hi ${i.musicianEmail}, you have been offered the following gig: ${process.env.NGROK_URL}/event/${result.event.id} \n Respond "YES ${i.id}" to accept or "NO ${i.id}" to decline.`
      }))
    }
    
    res.status(200).json({result: result, call: currentCalls})
    
    
  } else {
    const result = await prisma.eventInstrument.create({
      data: {
        event: {
          connect: { id: eventId }
        },
        instrumentName: instrumentName,
        musicians: {
          createMany: {
            data: [...musicians]
          }
        },
        callOrder: callOrder, 
        numToBook: Number(numToBook)
      },
      include: {
        musicians: true,
        event: true
      }
    }) 

    if (callOrder === "simultaneous") {
        currentCalls = result.musicians.map(i => ({
          eventInstrumentId: result.id,
          callId: i.id, 
          name: i.musicianEmail,
          number: process.env.PHONE,
          body: `Hi ${i.musicianEmail}, you have been offered the following gig: ${process.env.NGROK_URL}/event/${result.event.id} \nRespond "YES ${i.id}" to accept or "NO ${i.id}" to decline. **Other calls out**`
        }))
    } else {
      currentCalls = result.musicians.slice(0, result.numToBook).map(i => ({
        eventInstrumentId: result.id,
        callId: i.id, 
        name: i.musicianEmail,
        number: process.env.PHONE,
        body: `Hi ${i.musicianEmail}, you have been offered the following gig: ${process.env.NGROK_URL}/event/${result.event.id} \nRespond "YES ${i.id}" to accept or "NO ${i.id}" to decline.`
      }))
    }
    
    console.log(`calls: ${currentCalls}`)
    
    res.status(200).json({result: result, call: currentCalls})


  }
}

