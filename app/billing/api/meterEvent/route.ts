import { NextRequest, NextResponse } from "next/server";
import { addMeterEvent } from "./lib";

export async function POST(req: NextRequest) {
  const { subscriptionID } = await req.json();
  console.log("Hello from MeterEvent")

  try {
    const meterEvent = addMeterEvent(subscriptionID)
    return NextResponse.json({ meterEvent: meterEvent }); 
  } catch(err) {
    console.error('Error creating meter event:', err);
    // Return error response in case of failure
    return new NextResponse(
      JSON.stringify({ error: 'Unable to add meter event' }),
      { status: 500 }
    );

  }
}