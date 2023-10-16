import prisma from "../../../client"
import { sendMessage } from "../fixing/messages"

const cancelAndMessageAll = async(message: string, eventId: number) => {
  const msgPlayers = await msgAllPlayers(message, eventId)
  const deletedEvent = await deleteEvent(eventId)
  return {msgPlayers, deletedEvent}
}

const deleteEvent = async (eventId: number) => {
  const cancelledEvent = await prisma.event.delete({
    where: {
      id: eventId
    }
  })

  return cancelledEvent
}

const msgAllPlayers = async (message: string, eventId: number) => {
  
  const allPlayers = await getAllPlayers(eventId)
  let sentMsgs =  []
  for (let i = 0; i < allPlayers.length; i ++) {
    sentMsgs = [sentMsgs, await sendMessage(message, process.env.PHONE)]
  }
  
  return sentMsgs
}

const getAllPlayers = async (eventId: number) => {
  const allCalls = await prisma.call.findMany({
    where: {
      eventId: eventId
    },
    include: {
      playerCalls: true
    }
  })

  let allPlayers = [];

  for (let i = 0; i < allCalls.length; i ++) {
    allPlayers = [...allPlayers, ...allCalls[i].playerCalls.filter(i => i.accepted !== false && i.recieved === true && !allPlayers.includes(i.musicianId)).map(i => i.musicianId)]
  }
  return allPlayers
}


export default async function handle(req, res) {
  const { message, eventId } = req.body
  res.status(200).json(await cancelAndMessageAll(message, eventId))
}