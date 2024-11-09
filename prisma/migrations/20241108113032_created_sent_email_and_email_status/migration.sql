-- CreateEnum
CREATE TYPE "EmailStatus" AS ENUM ('PROCESSED', 'DELIVERED', 'OPENED', 'CLICKED', 'FAILED', 'BOUNCED');

-- CreateTable
CREATE TABLE "SentEmail" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "bodyText" TEXT NOT NULL,
    "status" "EmailStatus" NOT NULL DEFAULT 'PROCESSED',
    "eventId" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SentEmail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SentEmail" ADD CONSTRAINT "SentEmail_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
