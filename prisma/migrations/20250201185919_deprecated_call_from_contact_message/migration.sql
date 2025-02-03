/*
  Warnings:

  - You are about to drop the `_CallToContactMessage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CallToContactMessage" DROP CONSTRAINT "_CallToContactMessage_A_fkey";

-- DropForeignKey
ALTER TABLE "_CallToContactMessage" DROP CONSTRAINT "_CallToContactMessage_B_fkey";

-- DropTable
DROP TABLE "_CallToContactMessage";
