/*
  Warnings:

  - You are about to drop the column `ensembleId` on the `MeterEvent` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MeterEvent" DROP CONSTRAINT "MeterEvent_ensembleId_fkey";

-- AlterTable
ALTER TABLE "MeterEvent" DROP COLUMN "ensembleId";
