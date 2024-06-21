-- CreateTable
CREATE TABLE "AdminInvite" (
    "id" TEXT NOT NULL,
    "ensembleId" TEXT NOT NULL,
    "accepted" BOOLEAN,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "positionTitle" TEXT NOT NULL,

    CONSTRAINT "AdminInvite_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdminInvite" ADD CONSTRAINT "AdminInvite_ensembleId_fkey" FOREIGN KEY ("ensembleId") REFERENCES "Ensemble"("id") ON DELETE CASCADE ON UPDATE CASCADE;
