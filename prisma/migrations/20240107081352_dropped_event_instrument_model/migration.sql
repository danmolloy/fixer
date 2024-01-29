/*
  Warnings:

  - You are about to drop the column `eventInstrumentId` on the `PlayerCall` table. All the data in the column will be lost.
  - You are about to drop the `EventInstrument` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EventInstrument" DROP CONSTRAINT "EventInstrument_eventId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerCall" DROP CONSTRAINT "PlayerCall_eventInstrumentId_fkey";

-- AlterTable
ALTER TABLE "PlayerCall" DROP COLUMN "eventInstrumentId";

-- DropTable
DROP TABLE "EventInstrument";
