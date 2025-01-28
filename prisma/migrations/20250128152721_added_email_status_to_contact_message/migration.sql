-- AlterTable
ALTER TABLE "ContactMessage" ADD COLUMN     "emailStatus" "EmailStatus";

-- AlterTable
ALTER TABLE "_CallToContactMessage" ADD CONSTRAINT "_CallToContactMessage_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_CallToContactMessage_AB_unique";
