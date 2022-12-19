-- CreateTable
CREATE TABLE "EventInstrument" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventId" INTEGER NOT NULL,
    "instrumentName" TEXT NOT NULL,

    CONSTRAINT "EventInstrument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "playerCall" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "eventInstrumentId" INTEGER NOT NULL,
    "musicianEmail" TEXT NOT NULL,
    "recieved" BOOLEAN NOT NULL,
    "accepted" BOOLEAN NOT NULL,

    CONSTRAINT "playerCall_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventInstrument" ADD CONSTRAINT "EventInstrument_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playerCall" ADD CONSTRAINT "playerCall_musicianEmail_fkey" FOREIGN KEY ("musicianEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "playerCall" ADD CONSTRAINT "playerCall_eventInstrumentId_fkey" FOREIGN KEY ("eventInstrumentId") REFERENCES "EventInstrument"("id") ON DELETE CASCADE ON UPDATE CASCADE;
