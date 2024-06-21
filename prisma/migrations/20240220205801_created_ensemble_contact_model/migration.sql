-- CreateTable
CREATE TABLE "EnsembleContact" (
    "id" TEXT NOT NULL,
    "ensembleId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "positionNumber" TEXT NOT NULL,
    "category" TEXT,
    "adressBook" TEXT NOT NULL,

    CONSTRAINT "EnsembleContact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EnsembleContact" ADD CONSTRAINT "EnsembleContact_ensembleId_fkey" FOREIGN KEY ("ensembleId") REFERENCES "Ensemble"("id") ON DELETE CASCADE ON UPDATE CASCADE;
