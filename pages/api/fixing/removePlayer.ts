import prisma from '../../../client'
import { handleFixing } from './bookingFunctions'

const removePlayerCall = async (playerCallId) => {

  await prisma.playerCall.delete({
    where: {
      id: playerCallId
    }
  })
  await handleFixing(playerCallId)
}


export default async function handle(req, res) {
  const { 
    playerCallId,
  } = req.body

    res.status(200).json(await removePlayerCall(playerCallId))

  }
  
  export { removePlayerCall };