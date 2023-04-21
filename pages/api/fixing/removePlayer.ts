import prisma from '../../../client'

const removePlayerCall = async (playerCallId) => {

  return await prisma.playerCall.delete({
    where: {
      id: playerCallId
    }
  })
}


export default async function handle(req, res) {
  const { 
    playerCallId,
  } = req.body

    res.status(200).json(await removePlayerCall(playerCallId))

  }