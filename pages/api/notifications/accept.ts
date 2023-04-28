import prisma from "../../../client"

const updateAccepted = async (accepted: boolean, callId: number) => {
  return await prisma.playerCall.update({
    where: {
      id: callId
    },
    data: {
      accepted: accepted
    }
  })
}

export default async function handle(req, res) {
  const { accepted, callId } = req.body;
  
  res.status(200).json(await updateAccepted(accepted, callId))
}