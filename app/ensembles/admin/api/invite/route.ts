import axios from 'axios';
import { createAdminInvite } from './functions';

const url = `${process.env.URL}`

export async function POST(request: Request) {
  const req = await request.json();

await createAdminInvite(req);


  return new Response();
}
