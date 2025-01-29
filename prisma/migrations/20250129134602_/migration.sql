/*
  Warnings:

  - The `accessType` column on the `EnsembleAdmin` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "EnsembleAdmin" DROP COLUMN "accessType",
ADD COLUMN     "accessType" "AccessType" NOT NULL DEFAULT 'FULL';
