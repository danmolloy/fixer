/*
  Warnings:

  - You are about to drop the `CallAvailability` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `playerCall` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "playerCall" DROP CONSTRAINT "playerCall_eventInstrumentId_fkey";

-- DropForeignKey
ALTER TABLE "playerCall" DROP CONSTRAINT "playerCall_musicianEmail_fkey";

-- DropTable
DROP TABLE "CallAvailability";

-- DropTable
DROP TABLE "playerCall";

-- CreateTable
CREATE TABLE "PlayerCall" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recieved" BOOLEAN NOT NULL DEFAULT false,
    "accepted" BOOLEAN,
    "musicianEmail" TEXT NOT NULL,
    "eventInstrumentId" INTEGER NOT NULL,

    CONSTRAINT "PlayerCall_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndividualPlayerCall" (
    "id" SERIAL NOT NULL,
    "callId" INTEGER NOT NULL,
    "playerCallId" INTEGER NOT NULL,
    "bookingOrAvailability" TEXT NOT NULL DEFAULT 'Booking',
    "playerAvailable" BOOLEAN,

    CONSTRAINT "IndividualPlayerCall_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PlayerCall" ADD CONSTRAINT "PlayerCall_eventInstrumentId_fkey" FOREIGN KEY ("eventInstrumentId") REFERENCES "EventInstrument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerCall" ADD CONSTRAINT "PlayerCall_musicianEmail_fkey" FOREIGN KEY ("musicianEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualPlayerCall" ADD CONSTRAINT "IndividualPlayerCall_callId_fkey" FOREIGN KEY ("callId") REFERENCES "Call"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndividualPlayerCall" ADD CONSTRAINT "IndividualPlayerCall_playerCallId_fkey" FOREIGN KEY ("playerCallId") REFERENCES "PlayerCall"("id") ON DELETE CASCADE ON UPDATE CASCADE;
