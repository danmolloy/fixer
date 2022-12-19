/*
  Warnings:

  - Added the required column `fixerEmail` to the `Call` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Call" ADD COLUMN     "fixerEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_fixerEmail_fkey" FOREIGN KEY ("fixerEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
