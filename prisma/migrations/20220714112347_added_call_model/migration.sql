/*
  Warnings:

  - You are about to drop the column `concertStartTime` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `concertVenue` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `rehearsalEndTime` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `rehearsalStartTime` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `rehearsalVenue` on the `Event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "concertStartTime",
DROP COLUMN "concertVenue",
DROP COLUMN "rehearsalEndTime",
DROP COLUMN "rehearsalStartTime",
DROP COLUMN "rehearsalVenue";

-- CreateTable
CREATE TABLE "Call" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "venue" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "Call_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
