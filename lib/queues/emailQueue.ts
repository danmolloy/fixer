import { Queue } from "bullmq";
import { redis } from "../redis.js";
import { SentEmailData } from "../../app/sendGrid/lib";

export const emailQueue = new Queue("emailQueue", { connection: redis });

export const addEmailToQueue = async (data: SentEmailData) => {
  await emailQueue.add("sendEmail", data);
  console.log("Email added to queue");
};