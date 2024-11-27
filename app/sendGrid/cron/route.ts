import { NextResponse } from 'next/server';
import {
  remindFixers,
  remindMusicians,
  remindUnresponsiveMusicians,
  reportUnresponsiveMusicians,
} from './lib';

export async function POST() {
  try {
    await remindMusicians();
    await remindFixers();
    await reportUnresponsiveMusicians();
    await remindUnresponsiveMusicians();
    return NextResponse.json({success: true}, {status: 201});
  } catch(e: any) {
    return NextResponse.json({error: e.message || "An unexpected error occurred", success: false}, {status: 500});
  }

}
