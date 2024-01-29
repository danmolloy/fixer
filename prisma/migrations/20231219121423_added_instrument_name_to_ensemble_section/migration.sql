/*
  Warnings:

  - Added the required column `instrument` to the `EnsembleSection` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "EnsembleSection" ADD COLUMN     "instrument" TEXT NOT NULL;
