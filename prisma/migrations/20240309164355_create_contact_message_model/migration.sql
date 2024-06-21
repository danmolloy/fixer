-- CreateTable
CREATE TABLE "ContactMessage" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "recieved" BOOLEAN NOT NULL DEFAULT false,
    "recievedDate" TIMESTAMP(3),
    "accepted" BOOLEAN,
    "acceptedDate" TIMESTAMP(3),
    "contactId" TEXT NOT NULL,
    "playerMessage" TEXT,
    "eventSectionId" INTEGER NOT NULL,
    "indexNumber" INTEGER NOT NULL,
    "bookingOrAvailability" TEXT NOT NULL DEFAULT 'Booking',
    "offerExpiry" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'OK',

    CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CallToContactMessage" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CallToContactMessage_AB_unique" ON "_CallToContactMessage"("A", "B");

-- CreateIndex
CREATE INDEX "_CallToContactMessage_B_index" ON "_CallToContactMessage"("B");

-- AddForeignKey
ALTER TABLE "ContactMessage" ADD CONSTRAINT "ContactMessage_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "EnsembleContact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactMessage" ADD CONSTRAINT "ContactMessage_eventSectionId_fkey" FOREIGN KEY ("eventSectionId") REFERENCES "EventSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CallToContactMessage" ADD CONSTRAINT "_CallToContactMessage_A_fkey" FOREIGN KEY ("A") REFERENCES "Call"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CallToContactMessage" ADD CONSTRAINT "_CallToContactMessage_B_fkey" FOREIGN KEY ("B") REFERENCES "ContactMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
