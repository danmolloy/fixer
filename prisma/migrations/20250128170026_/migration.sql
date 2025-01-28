/*
  Warnings:

  - The values [OPENED,CLICKED,FAILED,BOUNCED] on the enum `EmailStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EmailStatus_new" AS ENUM ('PROCESSED', 'DELIVERED', 'OPEN', 'CLICK', 'BOUNCE');
ALTER TABLE "SentEmail" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "ContactMessage" ALTER COLUMN "emailStatus" TYPE "EmailStatus_new" USING ("emailStatus"::text::"EmailStatus_new");
ALTER TABLE "SentEmail" ALTER COLUMN "status" TYPE "EmailStatus_new" USING ("status"::text::"EmailStatus_new");
ALTER TYPE "EmailStatus" RENAME TO "EmailStatus_old";
ALTER TYPE "EmailStatus_new" RENAME TO "EmailStatus";
DROP TYPE "EmailStatus_old";
ALTER TABLE "SentEmail" ALTER COLUMN "status" SET DEFAULT 'PROCESSED';
COMMIT;
