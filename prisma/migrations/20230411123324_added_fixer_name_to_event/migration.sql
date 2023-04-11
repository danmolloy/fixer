-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "fixerName" TEXT,
ALTER COLUMN "confirmedOrOnHold" SET DEFAULT 'On Hold';
