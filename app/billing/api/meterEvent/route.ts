import { NextRequest, NextResponse } from 'next/server';
import { addMeterEvent } from './lib';

export async function POST(req: NextRequest) {
  const { subscriptionID } = await req.json();
  console.log('Hello from MeterEvent');

  try {
    const meterEvent = addMeterEvent(subscriptionID);
    return NextResponse.json({ meterEvent: meterEvent });
  } catch(e: any) {
    return NextResponse.json({error: e.message || "An unexpected error occurred", success: false}, {status: 500});
  }
}
