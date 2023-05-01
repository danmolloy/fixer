const MessagingResponse = require('twilio').twiml.MessagingResponse;
import prisma from '../../../client'
import { twilioClient } from "../../../twilio"

const twiml = new MessagingResponse();

const regExCheck = (msgBody) => {
    console.log(`regExCheck msgBody: ${msgBody}`)
    const yesRegex = /["']?\s?(yes)\s?\d+\s?["']?/i
    const noRegex = /["']?\s?(no)\s?\d+\s?["']?/i
    //const idRegex = /\d+/g;
    let result;

    if (!yesRegex.test(msgBody.trim().toUpperCase()) && !noRegex.test(msgBody.trim().toUpperCase())) {
        result = undefined
    } else if (yesRegex.test(msgBody.trim().toUpperCase())) {
        result = true
    } else if (noRegex.test(msgBody.trim().toUpperCase())) {
        result = false
    }
    console.log(`result at regExCheck: ${result}`)

    return result;
}

const handleUndefined = () => {
    twiml.message('Please respond either YES to accept or NO to decline');
    return;
}

const handleTrue = async (msgBody) => {
    const idRegex = /\d+/g;
    const id = Number(msgBody.match(idRegex)[0])
    console.log(`id: ${id}`)
    //twiml.toString();
    let result;

    try {
       result = await prisma.playerCall.update({
        where: {
            id: id
        },
        data: {
            accepted: true
        }
    })}
    catch (error) {
        console.log(error)
    }
    twiml.message(`We have notified the fixer you have accepted offer ${result.id}.`);

    return handleNextCall(result);
}

const handleFalse = async(msgBody) => {
    const idRegex = /\d+/g;
    twiml.message('We have notified the fixer you have declined this work.');
    twiml.toString()
    let result = await prisma.playerCall.update({
        where: {
            id: Number(msgBody.match(idRegex)[0])
        },
        data: {
            accepted: false,
        },
        include: { 
            eventInstrument: {
                include: {
                    musicians: true,
                    event: true
                }
            }
        }
    })


    return handleNextCall(result);
}

const handleNextCall = (result) => {
    
    return;
}

const handleMessage = (msgBody) => {
    console.log(`handleMessage msgBody: ${msgBody}`)
    let response = regExCheck(msgBody)

     if (response === true) {
        console.log(`handleMessage response === true`)
        return handleTrue(msgBody)
    } else if (response === false) {
        return handleFalse(msgBody)
    } else {
        return handleUndefined()
    }

}

export default async function handler(req, res) {
    const {
        Body
    } = req.body

    console.log(`Body at handler: ${Body}`)

    handleMessage(Body)
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
}


const msgBody = (playerCall) => {
    const body = `
      Hi ${playerCall.musician.name},
  
      ${playerCall.eventInstrument.event.fixerName} ${playerCall.bookingOrAvailability === "Booking" ? "offers:" : "checks availability for:"}
      
      ${`${process.env.URL}/event/${playerCall.eventInstrument.eventId}`}
      
      Reply YES ${playerCall.id} to accept or NO ${playerCall.id} to decline.
      
      For other options, contact ${playerCall.eventInstrument.event.fixerName} directly.
    `
    
    return body;
  }
  