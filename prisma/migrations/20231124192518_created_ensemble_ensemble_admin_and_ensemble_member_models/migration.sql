-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "ensembleId" TEXT;

-- CreateTable
CREATE TABLE "Ensemble" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL,

    CONSTRAINT "Ensemble_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnsembleAdmin" (
    "id" TEXT NOT NULL,
    "ensembleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "positionTitle" TEXT NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EnsembleAdmin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnsembleMember" (
    "id" TEXT NOT NULL,
    "ensembleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "positionNumber" TEXT NOT NULL,
    "positionTitle" TEXT NOT NULL,
    "section" TEXT NOT NULL,
    "doubles" BOOLEAN NOT NULL,
    "approved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "EnsembleMember_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ensemble_name_key" ON "Ensemble"("name");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_ensembleId_fkey" FOREIGN KEY ("ensembleId") REFERENCES "Ensemble"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnsembleAdmin" ADD CONSTRAINT "EnsembleAdmin_ensembleId_fkey" FOREIGN KEY ("ensembleId") REFERENCES "Ensemble"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnsembleAdmin" ADD CONSTRAINT "EnsembleAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnsembleMember" ADD CONSTRAINT "EnsembleMember_ensembleId_fkey" FOREIGN KEY ("ensembleId") REFERENCES "Ensemble"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnsembleMember" ADD CONSTRAINT "EnsembleMember_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
