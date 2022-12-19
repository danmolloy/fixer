/*
  Warnings:

  - You are about to drop the column `content` on the `Event` table. All the data in the column will be lost.
  - Added the required column `additionalInfo` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `concertProgram` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `concertStartTime` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `concertVenue` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dressCode` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ensembleName` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fee` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rehearsalEndTime` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rehearsalStartTime` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rehearsalVenue` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "content",
ADD COLUMN     "additionalInfo" TEXT NOT NULL,
ADD COLUMN     "concertProgram" TEXT NOT NULL,
ADD COLUMN     "concertStartTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "concertVenue" TEXT NOT NULL,
ADD COLUMN     "dressCode" TEXT NOT NULL,
ADD COLUMN     "ensembleName" TEXT NOT NULL,
ADD COLUMN     "fee" TEXT NOT NULL,
ADD COLUMN     "rehearsalEndTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "rehearsalStartTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "rehearsalVenue" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "QuickFix" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "fixerEmail" TEXT NOT NULL,

    CONSTRAINT "QuickFix_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuickFix" ADD CONSTRAINT "QuickFix_fixerEmail_fkey" FOREIGN KEY ("fixerEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
