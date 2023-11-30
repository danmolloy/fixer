/*
  Warnings:

  - You are about to drop the column `approved` on the `EnsembleAdmin` table. All the data in the column will be lost.
  - You are about to drop the column `approved` on the `EnsembleMember` table. All the data in the column will be lost.
  - You are about to drop the column `doubles` on the `EnsembleMember` table. All the data in the column will be lost.
  - You are about to drop the column `section` on the `EnsembleMember` table. All the data in the column will be lost.
  - Added the required column `sectionId` to the `EnsembleMember` table without a default value. This is not possible if the table is not empty.
  - Made the column `ensembleId` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "EnsembleMember" DROP CONSTRAINT "EnsembleMember_ensembleId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_ensembleId_fkey";

-- AlterTable
ALTER TABLE "EnsembleAdmin" DROP COLUMN "approved";

-- AlterTable
ALTER TABLE "EnsembleMember" DROP COLUMN "approved",
DROP COLUMN "doubles",
DROP COLUMN "section",
ADD COLUMN     "sectionId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Event" ALTER COLUMN "ensembleId" SET NOT NULL;

-- CreateTable
CREATE TABLE "EnsembleSection" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "ensembleId" TEXT NOT NULL,

    CONSTRAINT "EnsembleSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnsembleExtra" (
    "id" TEXT NOT NULL,
    "ensembleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "positionNumber" TEXT NOT NULL,
    "positionTitle" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,

    CONSTRAINT "EnsembleExtra_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bulletin" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Bulletin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BulletinToEnsembleSection" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BulletinToEnsembleSection_AB_unique" ON "_BulletinToEnsembleSection"("A", "B");

-- CreateIndex
CREATE INDEX "_BulletinToEnsembleSection_B_index" ON "_BulletinToEnsembleSection"("B");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_ensembleId_fkey" FOREIGN KEY ("ensembleId") REFERENCES "Ensemble"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnsembleSection" ADD CONSTRAINT "EnsembleSection_ensembleId_fkey" FOREIGN KEY ("ensembleId") REFERENCES "Ensemble"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnsembleMember" ADD CONSTRAINT "EnsembleMember_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "EnsembleSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnsembleExtra" ADD CONSTRAINT "EnsembleExtra_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "EnsembleSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnsembleExtra" ADD CONSTRAINT "EnsembleExtra_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bulletin" ADD CONSTRAINT "Bulletin_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BulletinToEnsembleSection" ADD CONSTRAINT "_BulletinToEnsembleSection_A_fkey" FOREIGN KEY ("A") REFERENCES "Bulletin"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BulletinToEnsembleSection" ADD CONSTRAINT "_BulletinToEnsembleSection_B_fkey" FOREIGN KEY ("B") REFERENCES "EnsembleSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
