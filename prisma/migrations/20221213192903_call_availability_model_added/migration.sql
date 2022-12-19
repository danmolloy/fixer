-- CreateTable
CREATE TABLE "CallAvailability" (
    "id" SERIAL NOT NULL,
    "callId" INTEGER NOT NULL,
    "playerCallId" INTEGER NOT NULL,
    "available" BOOLEAN,

    CONSTRAINT "CallAvailability_pkey" PRIMARY KEY ("id")
);
