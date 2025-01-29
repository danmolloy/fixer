/*
  Warnings:

  - The `bookingStatus` column on the `EventSection` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "EventSection" DROP COLUMN "bookingStatus",
ADD COLUMN     "bookingStatus" "BookingStatus" NOT NULL DEFAULT 'INACTIVE';
