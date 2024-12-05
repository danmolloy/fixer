/*
  Warnings:

  - You are about to drop the column `status` on the `ContactMessage` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ContactMessageType" AS ENUM ('BOOKING', 'AVAILABILITY', 'AUTOBOOK');

-- CreateEnum
CREATE TYPE "ContactMessageStatus" AS ENUM ('ACCEPTED', 'DECLINED', 'NOTCONTACTED', 'AWAITINGREPLY', 'AVAILABLE', 'MIXED', 'AUTOBOOKED', 'ERROR', 'FINDINGDEP');

-- AlterTable
ALTER TABLE "ContactMessage" DROP COLUMN "status",
ADD COLUMN     "type" "ContactMessageType" NOT NULL DEFAULT 'AVAILABILITY';
