/*
  Warnings:

  - You are about to drop the `EnsembleExtra` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EnsembleMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EnsembleExtra" DROP CONSTRAINT "EnsembleExtra_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "EnsembleExtra" DROP CONSTRAINT "EnsembleExtra_userId_fkey";

-- DropForeignKey
ALTER TABLE "EnsembleMember" DROP CONSTRAINT "EnsembleMember_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "EnsembleMember" DROP CONSTRAINT "EnsembleMember_userId_fkey";

-- DropTable
DROP TABLE "EnsembleExtra";

-- DropTable
DROP TABLE "EnsembleMember";
