/*
  Warnings:

  - You are about to drop the `Bulletin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BulletinToEnsembleSection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Bulletin" DROP CONSTRAINT "Bulletin_authorId_fkey";

-- DropForeignKey
ALTER TABLE "_BulletinToEnsembleSection" DROP CONSTRAINT "_BulletinToEnsembleSection_A_fkey";

-- DropForeignKey
ALTER TABLE "_BulletinToEnsembleSection" DROP CONSTRAINT "_BulletinToEnsembleSection_B_fkey";

-- DropTable
DROP TABLE "Bulletin";

-- DropTable
DROP TABLE "_BulletinToEnsembleSection";
