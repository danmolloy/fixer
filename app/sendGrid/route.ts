import { EmailData, ShortEmailData } from "./lib"; 
const sgMail = require('@sendgrid/mail');


export async function POST(request: Request & {body: {
    emailData: EmailData | ShortEmailData
    templateID: string,
    emailAddress: string|string[]
  }
}) {
  const req = await request.json();
  
  if (process.env.TWILIO_ACTIVE === "false") {
    console.log("Recieved at SendGrid.");
    return new Response(JSON.stringify({ status: 'Email would have sent successfully!' }), { status: 202 }); 
  }
  const emailData = {
    from: process.env.FROM_EMAIL,
    personalizations: [{
      to: process.env.TWILIO_ACTIVE === "preview" 
        ? 'danmolloy91@gmail.com'
        : req.body.emailAddress,
      dynamic_template_data: req.body.emailData
    }],
    template_id: req.body.templateID
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
