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
  } catch (e) {
    console.log(`error: ${e}`);
    throw new Error(e);
  }

  return new Response().json();
}
