import type { NextApiRequest, NextApiResponse } from 'next'
import { handleFixing, updatePlayerCall } from './bookingFunctions'



const handleDepOut = async (deppingObj: {playerCallId: number, eventInstrumentId: number}) => {
  const data = {
    status: "DEP OUT"
  }
  await updatePlayerCall(deppingObj.playerCallId, data)
  await handleFixing(deppingObj.eventInstrumentId)
}



export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    playerCallId,
    eventInstrumentId
  } = req.body

  const deppingObj: {playerCallId: number, eventInstrumentId: number} = {
    playerCallId,
    eventInstrumentId,
  }

  res.status(200).json(await handleDepOut(deppingObj))
  //res.status(200).json(await handleOffer(deppingObj))
  

}
