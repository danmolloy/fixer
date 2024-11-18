/*
  Warnings:

  - You are about to drop the column `recieved` on the `ContactMessage` table. All the data in the column will be lost.
  - You are about to drop the column `recievedDate` on the `ContactMessage` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ContactMessage" DROP COLUMN "recieved",
DROP COLUMN "recievedDate",
ADD COLUMN     "received" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "receivedDate" TIMESTAMP(3);
