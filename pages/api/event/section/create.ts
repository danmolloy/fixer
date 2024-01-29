import prisma from "../../../../client";
import { CreateEnsembleSectionProps, createEventSection, createPlayerCall } from "../../fixing/bookingFunctions/prismaFunctions";

export const handleCreateSection = async(reqObj: CreateEnsembleSectionProps) => {
  const eventSection = await createEventSection({
    eventId: reqObj.eventId,
    ensembleSectionId: reqObj.ensembleSectionId,
    numToBook: reqObj.numToBook
  })
  
  for (let i = 0; i < reqObj.musicians.length; i ++) {
    await createPlayerCall({
      playerCall: {
        bookingOrAvailability: reqObj.bookingOrAvailability,
        playerMessage: reqObj.musicians[i].addedMessage,
        musician: {
          connect: {
            id: reqObj.musicians[i].musicianId
          }
        },
        indexNumber: i,
        eventSection: {
          connect: {
            id: eventSection.id
          }
        }
      },
      calls: {
        connect: reqObj.musicians[i].calls.map(i => ({
          id: Number(i)
        }))
      }
    })
  }
}


export default async function handle(req, res) {  
  res.status(200).json(await handleCreateSection(req.body))
} 