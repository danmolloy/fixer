/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `ContactMessage` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ContactMessage_token_key" ON "ContactMessage"("token");
