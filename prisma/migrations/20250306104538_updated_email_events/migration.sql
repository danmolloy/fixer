/*
  Warnings:

  - Added the required column `sentEmailID` to the `EmailEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "EmailEvent" DROP CONSTRAINT "EmailEvent_id_fkey";

-- AlterTable
ALTER TABLE "EmailEvent" ADD COLUMN     "sentEmailID" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "EmailEvent" ADD CONSTRAINT "EmailEvent_sentEmailID_fkey" FOREIGN KEY ("sentEmailID") REFERENCES "SentEmail"("id") ON DELETE CASCADE ON UPDATE CASCADE;
