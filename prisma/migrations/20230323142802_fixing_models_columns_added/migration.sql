-- AlterTable
ALTER TABLE "EventInstrument" ADD COLUMN     "bookingStatus" TEXT NOT NULL DEFAULT 'active',
ADD COLUMN     "fixerNote" TEXT,
ADD COLUMN     "messageToAll" TEXT;

-- AlterTable
ALTER TABLE "PlayerCall" ADD COLUMN     "playerMessage" TEXT;
