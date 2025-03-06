-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EmailStatus" ADD VALUE 'DROPPED';
ALTER TYPE "EmailStatus" ADD VALUE 'DEFERRED';
ALTER TYPE "EmailStatus" ADD VALUE 'OPENED';
ALTER TYPE "EmailStatus" ADD VALUE 'CLICKED';

-- CreateTable
CREATE TABLE "EmailEvent" (
    "id" TEXT NOT NULL,
    "status" "EmailStatus" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "contactMessageID" INTEGER,

    CONSTRAINT "EmailEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EmailEvent" ADD CONSTRAINT "EmailEvent_contactMessageID_fkey" FOREIGN KEY ("contactMessageID") REFERENCES "ContactMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
