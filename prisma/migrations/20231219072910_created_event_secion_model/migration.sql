/*
  Warnings:

  - Added the required column `eventSectionId` to the `PlayerCall` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlayerCall" ADD COLUMN     "eventSectionId" INTEGER NOT NULL,
ALTER COLUMN "musicianId" DROP DEFAULT;

-- CreateTable
CREATE TABLE "EventSection" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventId" INTEGER NOT NULL,
    "ensembleSectionId" TEXT NOT NULL,
    "bookingStatus" TEXT NOT NULL DEFAULT 'active',
    "numToBook" INTEGER NOT NULL,

    CONSTRAINT "EventSection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventSection" ADD CONSTRAINT "EventSection_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSection" ADD CONSTRAINT "EventSection_ensembleSectionId_fkey" FOREIGN KEY ("ensembleSectionId") REFERENCES "EnsembleSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerCall" ADD CONSTRAINT "PlayerCall_eventSectionId_fkey" FOREIGN KEY ("eventSectionId") REFERENCES "EventSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
