-- AlterTable
ALTER TABLE "AdminInvite" ADD COLUMN     "accessType" TEXT NOT NULL DEFAULT 'restricted';

-- AlterTable
ALTER TABLE "EnsembleAdmin" ADD COLUMN     "accessType" TEXT NOT NULL DEFAULT 'full';
