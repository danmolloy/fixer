import type { NextApiRequest, NextApiResponse } from 'next'
import { sendMessage } from "./messages";


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    message
  } = req.body

  res.status(200).json(await sendMessage(message, process.env.PHONE))
  

}
