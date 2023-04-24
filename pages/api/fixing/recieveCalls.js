const MessagingResponse = require('twilio').twiml.MessagingResponse;
import prisma from '../../../client'
import { twilioClient } from "../../../twilio"

// I don't think I'm calling twiml.toString() properly

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

const handleTrue = async(msgBody) => {
    console.log(`Top of handleTrue`)
    const idRegex = /\d+/g;
    let result = await prisma.playerCall.update({
        where: {
            id: Number(msgBody.match(idRegex)[0])
        },
        data: {
            accepted: true
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
    console.log(`Hello from handleTrue. idRegEx: ${idRegex}`)
    twiml.message('We have notified the fixer you have accepted this work.');
    twiml.toString();
    return handleNextCall(await result());
}

const handleFalse = async(msgBody) => {
    const idRegex = /\d+/g;
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

    twiml.message('We have notified the fixer you have declined this work.');
    twiml.toString()
    return handleNextCall(result);
}

const handleNextCall = (result) => {
    let numBooked = result.eventInstrument.musicians.filter(i => i.accepted === true).length
    if (numBooked === result.eventInstrument.numToBook) {
        console.log("All required musicians are booked")
    } else {
       const nextOnList = result.eventInstrument.musicians.filter(i => i.recieved === false)
        if (nextOnList.length < 1) {
            console.log("Add more players to list")
        } else {
            twilioClient.messages 
            .create({ 
                body: `Hi ${nextOnList[0].musicianEmail}, Dan Molloy offers ${process.env.NGROK_URL}/event/${result.eventInstrument.event.id} Respond "YES ${nextOnList[0].id}" to accept or "NO ${nextOnList[0].id}" to decline.`,  
                messagingServiceSid: 'MGa3507a546e0e4a6374af6d5fe19e9e16',      
                to: process.env.PHONE
            }) 
            .then(message => console.log(message.sid))
            .then(async() => await prisma.playerCall.update({
                where: {
                    id: nextOnList[0].id,
                },
                data: {
                    recieved: true
                }
            }))
            .done();
        }
    }
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

/* const yesRegex = /["']?\s?(yes)\s?\d+\s?["']?/i
    const noRegex = /["']?\s?(no)\s?\d+\s?["']?/i
    const idRegex = /\d+/g;
    //let result;
  
    // Start our TwiML response.
    const twiml = new MessagingResponse();

    console.log(JSON.stringify(Body.trim().toUpperCase()))
    if (!yesRegex.test(Body.trim().toUpperCase()) && !noRegex.test(Body.trim().toUpperCase())) {
        twiml.message('Please respond either YES to accept or NO to decline');
        res.writeHead(200, {'Content-Type': 'text/xml'});
        res.end(twiml.toString());
    } else if (yesRegex.test(Body.trim().toUpperCase())) {

        result = await prisma.playerCall.update({
            where: {
                id: Number(Body.match(idRegex)[0])
            },
            data: {
                accepted: true
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
        
        twiml.message('We have notified the fixer you have accepted this work.');

    } else if (noRegex.test(Body.trim().toUpperCase())) {
        result = await prisma.playerCall.update({
            where: {
                id: Number(Body.match(idRegex)[0])
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
        
        twiml.message('We have notified the fixer you have declined this work.');
    } 
    
    //Check if all musicians are booked. If not then message the next musician.
    let numBooked = result.eventInstrument.musicians.filter(i => i.accepted === true).length
    if (numBooked === result.eventInstrument.numToBook) {
        console.log("All required musicians are booked")
    } else {
       const nextOnList = result.eventInstrument.musicians.filter(i => i.recieved === false)
        if (nextOnList.length < 1) {
            console.log("Add more players to list")
        } else {
            twilioClient.messages 
            .create({ 
                body: `Hi ${nextOnList[0].musicianEmail}, are you available for the following: ${result.eventInstrument.event.ensembleName} ${result.eventInstrument.event.concertProgram} ${result.eventInstrument.event.fee}? Respond "YES ${nextOnList[0].id}" to accept or "NO ${nextOnList[0].id}" to decline.`,  
                messagingServiceSid: 'MGa3507a546e0e4a6374af6d5fe19e9e16',      
                to: process.env.PHONE 
            }) 
            .then(message => console.log(message.sid))
            .then(async() => await prisma.playerCall.update({
                where: {
                    id: nextOnList[0].id,
                },
                data: {
                    recieved: true
                }
            }))
            .done();
        }
    }
 */