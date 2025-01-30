/*
  Warnings:

  - You are about to drop the column `instrument` on the `Orchestration` table. All the data in the column will be lost.
  - Added the required column `eventSectionId` to the `Orchestration` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orchestration" DROP COLUMN "instrument",
ADD COLUMN     "eventSectionId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Orchestration" ADD CONSTRAINT "Orchestration_eventSectionId_fkey" FOREIGN KEY ("eventSectionId") REFERENCES "EventSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
