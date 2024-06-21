/*
  Warnings:

  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `profileText` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `BlockUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PlayerCall` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `QuickFix` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CallToPlayerCall` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BlockUser" DROP CONSTRAINT "BlockUser_blockedById_fkey";

-- DropForeignKey
ALTER TABLE "BlockUser" DROP CONSTRAINT "BlockUser_blockedUserId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerCall" DROP CONSTRAINT "PlayerCall_eventSectionId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerCall" DROP CONSTRAINT "PlayerCall_musicianId_fkey";

-- DropForeignKey
ALTER TABLE "QuickFix" DROP CONSTRAINT "QuickFix_fixerEmail_fkey";

-- DropForeignKey
ALTER TABLE "_CallToPlayerCall" DROP CONSTRAINT "_CallToPlayerCall_A_fkey";

-- DropForeignKey
ALTER TABLE "_CallToPlayerCall" DROP CONSTRAINT "_CallToPlayerCall_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "image",
DROP COLUMN "profileText";

-- DropTable
DROP TABLE "BlockUser";

-- DropTable
DROP TABLE "PlayerCall";

-- DropTable
DROP TABLE "QuickFix";

-- DropTable
DROP TABLE "_CallToPlayerCall";
