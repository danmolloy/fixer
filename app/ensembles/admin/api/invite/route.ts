import axios from 'axios';
import { createAdminInvite } from './functions';

const url = `${process.env.URL}`

export async function POST(request: Request) {
  const req = await request.json();

  try {
    const adminInvite = await createAdminInvite(req);

    await axios.post(`${url}/sendGrid`, {
      body: {
        emailData: adminInvite,
        templateID: "d-6ca4894faf6047e0a01f38d248907ee0",
        emailAddress: adminInvite.email
      }

    });
  } catch (e) {
    throw Error(e);
  }

  return new Response();
}
