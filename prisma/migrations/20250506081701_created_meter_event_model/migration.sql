-- CreateTable
CREATE TABLE "MeterEvent" (
    "id" TEXT NOT NULL,
    "timestamp" INTEGER NOT NULL,
    "contactMessageId" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "subscriptionId" TEXT NOT NULL,

    CONSTRAINT "MeterEvent_pkey" PRIMARY KEY ("id")
);
