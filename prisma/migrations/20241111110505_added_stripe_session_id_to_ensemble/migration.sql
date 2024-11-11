/*
  Warnings:

  - You are about to drop the column `stripeCustomerId` on the `Ensemble` table. All the data in the column will be lost.
  - You are about to drop the column `stripeSubscriptionId` on the `Ensemble` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Ensemble" DROP COLUMN "stripeCustomerId",
DROP COLUMN "stripeSubscriptionId",
ADD COLUMN     "stripeSessionId" TEXT;
