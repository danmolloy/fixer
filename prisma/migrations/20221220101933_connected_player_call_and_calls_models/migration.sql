/*
  Warnings:

  - You are about to drop the `IndividualPlayerCall` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "IndividualPlayerCall" DROP CONSTRAINT "IndividualPlayerCall_callId_fkey";

-- DropForeignKey
ALTER TABLE "IndividualPlayerCall" DROP CONSTRAINT "IndividualPlayerCall_playerCallId_fkey";

-- AlterTable
ALTER TABLE "PlayerCall" ADD COLUMN     "bookingOrAvailability" TEXT NOT NULL DEFAULT 'Booking';

-- DropTable
DROP TABLE "IndividualPlayerCall";

-- CreateTable
CREATE TABLE "_CallToPlayerCall" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CallToPlayerCall_AB_unique" ON "_CallToPlayerCall"("A", "B");

-- CreateIndex
CREATE INDEX "_CallToPlayerCall_B_index" ON "_CallToPlayerCall"("B");

-- AddForeignKey
ALTER TABLE "_CallToPlayerCall" ADD CONSTRAINT "_CallToPlayerCall_A_fkey" FOREIGN KEY ("A") REFERENCES "Call"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CallToPlayerCall" ADD CONSTRAINT "_CallToPlayerCall_B_fkey" FOREIGN KEY ("B") REFERENCES "PlayerCall"("id") ON DELETE CASCADE ON UPDATE CASCADE;
