-- CreateEnum
CREATE TYPE "ContactEventCallStatus" AS ENUM ('OFFER', 'CHECK', 'ACCEPTED', 'DECLINED', 'AVAILABLE');

-- CreateTable
CREATE TABLE "ContactEventCall" (
    "id" TEXT NOT NULL,
    "callId" INTEGER NOT NULL,
    "status" "ContactEventCallStatus" NOT NULL,
    "contactMessageId" INTEGER NOT NULL,

    CONSTRAINT "ContactEventCall_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ContactEventCall" ADD CONSTRAINT "ContactEventCall_callId_fkey" FOREIGN KEY ("callId") REFERENCES "Call"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactEventCall" ADD CONSTRAINT "ContactEventCall_contactMessageId_fkey" FOREIGN KEY ("contactMessageId") REFERENCES "ContactMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
