/*
  Warnings:

  - You are about to drop the column `musicianId` on the `PlayerCall` table. All the data in the column will be lost.
  - Added the required column `musicianEmail` to the `PlayerCall` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PlayerCall" DROP CONSTRAINT "PlayerCall_musicianId_fkey";

-- AlterTable
ALTER TABLE "PlayerCall" DROP COLUMN "musicianId",
ADD COLUMN     "musicianEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PlayerCall" ADD CONSTRAINT "PlayerCall_musicianEmail_fkey" FOREIGN KEY ("musicianEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
