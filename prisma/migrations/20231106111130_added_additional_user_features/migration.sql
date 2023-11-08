/*
  Warnings:

  - Added the required column `profileImg` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profileText` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fixingEnsembles" TEXT[],
ADD COLUMN     "instrumentsList" TEXT[],
ADD COLUMN     "profileImg" TEXT NOT NULL,
ADD COLUMN     "profileText" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "BlockUser" (
    "blockedById" TEXT NOT NULL,
    "blockedUserId" TEXT NOT NULL,

    CONSTRAINT "BlockUser_pkey" PRIMARY KEY ("blockedById","blockedUserId")
);

-- AddForeignKey
ALTER TABLE "BlockUser" ADD CONSTRAINT "BlockUser_blockedById_fkey" FOREIGN KEY ("blockedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlockUser" ADD CONSTRAINT "BlockUser_blockedUserId_fkey" FOREIGN KEY ("blockedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
