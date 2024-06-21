/*
  Warnings:

  - Added the required column `sectionId` to the `EnsembleContact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EnsembleContact" ADD COLUMN     "sectionId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "EnsembleContact" ADD CONSTRAINT "EnsembleContact_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "EnsembleSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
