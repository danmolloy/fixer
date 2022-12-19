-- AlterTable
ALTER TABLE "EventInstrument" ADD COLUMN     "callOrder" TEXT NOT NULL DEFAULT 'Ordered',
ADD COLUMN     "numToBook" INTEGER NOT NULL DEFAULT 1;
