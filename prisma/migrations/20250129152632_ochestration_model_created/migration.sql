-- CreateTable
CREATE TABLE "Orchestration" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "callId" INTEGER NOT NULL,
    "instrument" "SectionName" NOT NULL,
    "numRequired" INTEGER NOT NULL,

    CONSTRAINT "Orchestration_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orchestration" ADD CONSTRAINT "Orchestration_callId_fkey" FOREIGN KEY ("callId") REFERENCES "Call"("id") ON DELETE CASCADE ON UPDATE CASCADE;
