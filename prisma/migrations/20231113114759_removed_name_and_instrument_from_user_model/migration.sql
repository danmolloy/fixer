/*
  Warnings:

  - You are about to drop the column `instrument` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "instrument",
DROP COLUMN "name",
ALTER COLUMN "image" SET DEFAULT '';
