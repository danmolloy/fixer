/*
  Warnings:

  - You are about to drop the column `fixerId` on the `Event` table. All the data in the column will be lost.
  - Added the required column `fixerEmail` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_fixerId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "fixerId",
ADD COLUMN     "fixerEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_fixerEmail_fkey" FOREIGN KEY ("fixerEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
