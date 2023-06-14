/*
  Warnings:

  - You are about to drop the column `toDepPlayerCallId` on the `PlayerCall` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PlayerCall" DROP COLUMN "toDepPlayerCallId",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'OK';
