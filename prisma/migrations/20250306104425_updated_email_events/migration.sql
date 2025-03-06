-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EmailStatus" ADD VALUE 'OPEN';
ALTER TYPE "EmailStatus" ADD VALUE 'CLICK';

-- AddForeignKey
ALTER TABLE "EmailEvent" ADD CONSTRAINT "EmailEvent_id_fkey" FOREIGN KEY ("id") REFERENCES "SentEmail"("id") ON DELETE CASCADE ON UPDATE CASCADE;
