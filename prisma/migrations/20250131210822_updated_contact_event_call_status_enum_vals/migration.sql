/*
  Warnings:

  - The values [OFFER,CHECK] on the enum `ContactEventCallStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ContactEventCallStatus_new" AS ENUM ('TOOFFER', 'TOCHECK', 'OFFERING', 'CHECKING', 'ACCEPTED', 'DECLINED', 'AVAILABLE');
ALTER TABLE "ContactEventCall" ALTER COLUMN "status" TYPE "ContactEventCallStatus_new" USING ("status"::text::"ContactEventCallStatus_new");
ALTER TYPE "ContactEventCallStatus" RENAME TO "ContactEventCallStatus_old";
ALTER TYPE "ContactEventCallStatus_new" RENAME TO "ContactEventCallStatus";
DROP TYPE "ContactEventCallStatus_old";
COMMIT;
