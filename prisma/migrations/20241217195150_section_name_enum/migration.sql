/*
  Warnings:

  - Changed the type of `name` on the `EnsembleSection` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SectionName" AS ENUM ('FLUTE', 'OBOE', 'CLARINET', 'BASSOON', 'HORN', 'TRUMPET', 'TROMBONE', 'TUBA', 'TIMPANI', 'PERCUSSION', 'ORGAN', 'PIANO', 'VIOLIN1', 'VIOLIN2', 'VIOLA', 'CELLO', 'DOUBLEBASS');

-- AlterTable
ALTER TABLE "EnsembleSection" DROP COLUMN "name",
ADD COLUMN     "name" "SectionName" NOT NULL;
