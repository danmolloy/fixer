import prisma from "../../../client"

export const updatePlayerCall = async(playerCallObj: {data: {[x: string]: string}, playerCallId: number}) => {
  
  return await prisma.playerCall.update({
    where: {
      id: playerCallObj.playerCallId
    },
    data: {...playerCallObj.data},
  })
}


export default async function handle(req, res) {
  console.log(JSON.stringify(req.body))
  res.status(200).json(await updatePlayerCall(req.body))
}
