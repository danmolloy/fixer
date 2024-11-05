const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

export async function POST(request: Request & {body: {
  phoneNumber: string;
  message: string;
}
}) {
const req = await request.json();
console.log(`Twilio req: ${JSON.stringify(req)}`)

/* if (process.env.TWILIO_ACTIVE === "false") {
  console.log(`Recieved at the API: ${JSON.stringify(req.message)}`);
  return new Response(JSON.stringify({ status: 'SMS would have sent successfully!' }), { status: 202 }); 
} */


try {
  
const message = await client.messages
.create({
  body: req.body.message,
  from: process.env.TWILIO_FROM_NUMBER,
  to: process.env.TWILIO_ACTIVE === "false" 
  ? '+447479016386'
  : req.body.phoneNumber
})
console.log(message.body);

  return new Response(JSON.stringify({ status: 'SMS sent successfully!' }), { status: 202 });
} catch (error) {
  console.error(`Err!: ${error}`);
  return new Response(JSON.stringify({ error: 'Failed to send message', details: error }), { status: 500 });
}

}
