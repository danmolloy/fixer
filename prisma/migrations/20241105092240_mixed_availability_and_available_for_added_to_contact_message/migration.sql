-- AlterTable
ALTER TABLE "ContactMessage" ADD COLUMN     "availableFor" INTEGER[],
ADD COLUMN     "mixedAvailability" BOOLEAN NOT NULL DEFAULT false;
