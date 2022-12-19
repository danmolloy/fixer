-- DropForeignKey
ALTER TABLE "Call" DROP CONSTRAINT "Call_eventId_fkey";

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
