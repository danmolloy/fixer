/*
  Warnings:

  - You are about to drop the column `stripeSessionId` on the `Ensemble` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ensemble" DROP COLUMN "stripeSessionId",
ADD COLUMN     "stripeCustomerId" TEXT;
