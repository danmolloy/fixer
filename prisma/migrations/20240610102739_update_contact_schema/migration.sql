-- AlterTable
ALTER TABLE "EnsembleContact" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'OK',
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL;
