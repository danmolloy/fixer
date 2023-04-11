/*
  Warnings:

  - You are about to drop the column `fixerEmail` on the `Event` table. All the data in the column will be lost.
  - Added the required column `fixerId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_fixerEmail_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "fixerEmail",
ADD COLUMN     "fixerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_fixerId_fkey" FOREIGN KEY ("fixerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
