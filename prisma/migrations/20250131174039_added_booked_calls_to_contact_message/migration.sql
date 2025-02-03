-- CreateTable
CREATE TABLE "_ContactMessageToOrchestration" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ContactMessageToOrchestration_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ContactMessageToOrchestration_B_index" ON "_ContactMessageToOrchestration"("B");

-- AddForeignKey
ALTER TABLE "_ContactMessageToOrchestration" ADD CONSTRAINT "_ContactMessageToOrchestration_A_fkey" FOREIGN KEY ("A") REFERENCES "ContactMessage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContactMessageToOrchestration" ADD CONSTRAINT "_ContactMessageToOrchestration_B_fkey" FOREIGN KEY ("B") REFERENCES "Orchestration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
