/*
  Warnings:

  - You are about to drop the column `musicianEmail` on the `PlayerCall` table. All the data in the column will be lost.
  - Added the required column `musicianId` to the `PlayerCall` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PlayerCall" DROP CONSTRAINT "PlayerCall_musicianEmail_fkey";

-- AlterTable
ALTER TABLE "PlayerCall" DROP COLUMN "musicianEmail",
ADD COLUMN     "musicianId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PlayerCall" ADD CONSTRAINT "PlayerCall_musicianId_fkey" FOREIGN KEY ("musicianId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
