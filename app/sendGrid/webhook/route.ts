import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../client";
import { EmailStatus } from "@prisma/client";

const eventPriority = ["processed", "delivered", "open", "click"]

export async function POST(req: NextRequest) {
  try {
    let events;
    try {
      events = await req.json();
    } catch (e) {
      console.error("Invalid or empty JSON in webhook request");
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }    

    for (const webhook of events) {
      const { contactMessageID, event, timestamp, app, environment } = webhook;
      if (app !== "GigFix" || environment !== process.env.ENVIRONMENT) {
        continue;
      }
      if (!contactMessageID) {
        continue;
      }
        const contactMessage = await prisma.contactMessage.findUnique({
          where: {
            id: Number(contactMessageID)
          }
        })
        console.log(String(event).toUpperCase())
        if (!contactMessage) {
          continue;
        }
         if (contactMessage.emailStatus === null || (eventPriority.indexOf(contactMessage.emailStatus) < eventPriority.indexOf(event))) {
          await prisma.contactMessage.update({
            where: {
              id: Number(contactMessageID)
            },
            data: {
              emailStatus: String(event).toUpperCase() as EmailStatus
            }
          })
        } 
      
      
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing SendGrid webhook: ", error);
    return NextResponse.json({ error: "Webhook processing failed"}, { status: 500 })
  }
}