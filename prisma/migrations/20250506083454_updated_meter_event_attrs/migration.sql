/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `MeterEvent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contactMessageId]` on the table `MeterEvent` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ensembleId` to the `MeterEvent` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `contactMessageId` on the `MeterEvent` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "MeterEvent" ADD COLUMN     "ensembleId" TEXT NOT NULL,
DROP COLUMN "contactMessageId",
ADD COLUMN     "contactMessageId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MeterEvent_id_key" ON "MeterEvent"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MeterEvent_contactMessageId_key" ON "MeterEvent"("contactMessageId");

-- AddForeignKey
ALTER TABLE "MeterEvent" ADD CONSTRAINT "MeterEvent_contactMessageId_fkey" FOREIGN KEY ("contactMessageId") REFERENCES "ContactMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeterEvent" ADD CONSTRAINT "MeterEvent_ensembleId_fkey" FOREIGN KEY ("ensembleId") REFERENCES "Ensemble"("id") ON DELETE CASCADE ON UPDATE CASCADE;
