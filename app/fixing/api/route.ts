import { EmailData } from "../../sendGrid/lib"; 

const sgMail = require('@sendgrid/mail');


export async function POST(request: Request & {body: EmailData}) {

  const req = await request.json();
  
  if (process.env.TWILIO_ACTIVE === "false") {
    console.log(`Recieved at the API: ${JSON.stringify(req.body)}`);
    return new Response(JSON.stringify({ status: 'Email would have sent successfully!' }), { status: 202 }); 
  }
  const emailData = {
    from: process.env.FROM_EMAIL,
    personalizations: [{
      to: process.env.TWILIO_ACTIVE === "preview" 
        ? 'danmolloy91@gmail.com'
        : req.body.email,
      dynamic_template_data: req.body
    }],
    template_id: "d-f23e2cc89b50474b95ed0839995510c1"
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  try {
    const response = await sgMail.send(emailData);

    console.log(response[0].statusCode);
    console.log(response[0].headers);

    return new Response(JSON.stringify({ status: 'Email sent successfully!' }), { status: 202 });
  } catch (error) {
    console.error(`Err!: ${error}`);
    return new Response(JSON.stringify({ error: 'Failed to send email', details: error }), { status: 500 });
  }
  
}
