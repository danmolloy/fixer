/*
  Warnings:

  - You are about to drop the column `deppingPlayerId` on the `PlayerCall` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlayerCall" DROP COLUMN "deppingPlayerId",
ADD COLUMN     "toDepPlayerCallId" INTEGER;
