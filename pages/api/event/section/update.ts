import { UpdateEventSectionProps, updateEventSection, editPlayerCall, UpdatePlayerCallProps, createPlayerCall } from "../../fixing/bookingFunctions/prismaFunctions";


export const handleUpdateSection = async(
  reqObj: UpdateEventSectionProps) => {

  const eventSection =  await updateEventSection(reqObj)
  const currentLastIndex = eventSection.musicians.sort((a, b) => a.indexNumber - b.indexNumber)[eventSection.musicians.length - 1].indexNumber

  for (let i = 0; i < reqObj.addedMusicians.length; i ++) {
    await createPlayerCall({
      playerCall: {
        bookingOrAvailability: reqObj.bookingOrAvailability,
        playerMessage: reqObj.addedMusicians[i].addedMessage,
        musician: {
          connect: {
            id: reqObj.addedMusicians[i].musicianId
          }
        },
        indexNumber: currentLastIndex + 1 + i,
        eventSection: {
          connect: {
            id: eventSection.id
          }
        }
      },
      calls: {
        connect: reqObj.addedMusicians[i].calls.map(i => ({
          id: Number(i)
        }))
      }
    })
  }
  
}

export default async function handle(req, res) { 
  res.status(200).json(await handleUpdateSection(req.body))
} 