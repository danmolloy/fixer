/*
  Warnings:

  - You are about to drop the column `confirmedOrOnHold` on the `Event` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('CONFIRMED', 'ONHOLD');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "confirmedOrOnHold",
ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'ONHOLD';
