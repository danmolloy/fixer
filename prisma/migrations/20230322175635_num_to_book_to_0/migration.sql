/*
  Warnings:

  - You are about to drop the column `updates` on the `PlayerCall` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EventInstrument" ALTER COLUMN "numToBook" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "PlayerCall" DROP COLUMN "updates";
