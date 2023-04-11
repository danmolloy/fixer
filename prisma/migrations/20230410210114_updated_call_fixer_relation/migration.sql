/*
  Warnings:

  - You are about to drop the column `fixerEmail` on the `Call` table. All the data in the column will be lost.
  - Added the required column `fixerId` to the `Call` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Call" DROP CONSTRAINT "Call_fixerEmail_fkey";

-- AlterTable
ALTER TABLE "Call" DROP COLUMN "fixerEmail",
ADD COLUMN     "fixerId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_fixerId_fkey" FOREIGN KEY ("fixerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
