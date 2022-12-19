const accountSid = process.env.TWILIO_ACCOUNTSID; 
const authToken = process.env.TWILIO_AUTH_TOKEN; 
const client = require('twilio')(accountSid, authToken); 
const MessagingResponse = require('twilio').twiml.MessagingResponse;
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const {
        Body
    } = req.body

    const yesRegex = /["']?\s?(yes)\s?\d+\s?["']?/i
    const noRegex = /["']?\s?(no)\s?\d+\s?["']?/i
    const idRegex = /\d+/g;
    let result;
  
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
    
    /* Check if all musicians are booked. If not then message the next musician. */
    let numBooked = result.eventInstrument.musicians.filter(i => i.accepted === true).length
    if (numBooked === result.eventInstrument.numToBook) {
        console.log("All required musicians are booked")
    } else {
       const nextOnList = result.eventInstrument.musicians.filter(i => i.recieved === false)
        if (nextOnList.length < 1) {
            console.log("Add more players to list")
        } else {
            client.messages 
            .create({ 
                body: `Hi ${nextOnList[0].musicianEmail}, are you available for the following: ${result.eventInstrument.event.ensembleName} ${result.eventInstrument.event.concertProgram} ${result.eventInstrument.event.fee}? Respond "YES ${nextOnList[0].id}" to accept or "NO ${nextOnList[0].id}" to decline.`,  
                messagingServiceSid: 'MGa3507a546e0e4a6374af6d5fe19e9e16',      
                to: '+447479016386' 
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

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
}