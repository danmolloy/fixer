/*
  Warnings:

  - A unique constraint covering the columns `[stripeSubscriptionId]` on the table `Ensemble` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ensemble_stripeSubscriptionId_key" ON "Ensemble"("stripeSubscriptionId");
