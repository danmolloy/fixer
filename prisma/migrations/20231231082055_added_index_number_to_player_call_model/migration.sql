/*
  Warnings:

  - Added the required column `indexNumber` to the `PlayerCall` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlayerCall" ADD COLUMN     "indexNumber" INTEGER NOT NULL;
