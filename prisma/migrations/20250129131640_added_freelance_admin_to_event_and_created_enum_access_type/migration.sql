/*
  Warnings:

  - The `accessType` column on the `AdminInvite` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "AccessType" AS ENUM ('FULL', 'RESTRICTED');

-- AlterTable
ALTER TABLE "AdminInvite" DROP COLUMN "accessType",
ADD COLUMN     "accessType" "AccessType" NOT NULL DEFAULT 'RESTRICTED';

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "adminAccess" TEXT[];
