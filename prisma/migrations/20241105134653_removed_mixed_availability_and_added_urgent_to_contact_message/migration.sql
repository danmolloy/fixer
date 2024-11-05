/*
  Warnings:

  - You are about to drop the column `mixedAvailability` on the `ContactMessage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ContactMessage" DROP COLUMN "mixedAvailability",
ADD COLUMN     "urgent" BOOLEAN NOT NULL DEFAULT false;
