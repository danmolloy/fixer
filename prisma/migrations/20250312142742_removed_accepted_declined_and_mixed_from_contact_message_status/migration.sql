/*
  Warnings:

  - The values [ACCEPTED,DECLINED,MIXED] on the enum `ContactMessageStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ContactMessageStatus_new" AS ENUM ('IN_PROGRESS', 'RESPONDED', 'NOTCONTACTED', 'AWAITINGREPLY', 'AVAILABLE', 'AUTOBOOKED', 'ERROR', 'FINDINGDEP', 'CANCELLED', 'ESCALATED');
ALTER TABLE "ContactMessage" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "ContactMessage" ALTER COLUMN "status" TYPE "ContactMessageStatus_new" USING ("status"::text::"ContactMessageStatus_new");
ALTER TYPE "ContactMessageStatus" RENAME TO "ContactMessageStatus_old";
ALTER TYPE "ContactMessageStatus_new" RENAME TO "ContactMessageStatus";
DROP TYPE "ContactMessageStatus_old";
ALTER TABLE "ContactMessage" ALTER COLUMN "status" SET DEFAULT 'NOTCONTACTED';
COMMIT;
