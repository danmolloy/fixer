import { NextResponse } from "next/server";
import { getUpcomingEvents, getUpcomingMusicians, remindFixers, remindMusicians } from "./lib";

export async function POST() {
  const data = await remindMusicians();
  console.log(data);
  return new NextResponse();
}