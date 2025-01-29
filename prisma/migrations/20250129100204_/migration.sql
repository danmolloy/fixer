/*
  Warnings:

  - You are about to drop the column `accepted` on the `ContactMessage` table. All the data in the column will be lost.
  - You are about to drop the column `received` on the `ContactMessage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ContactMessage" DROP COLUMN "accepted",
DROP COLUMN "received";
