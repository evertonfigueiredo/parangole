/*
  Warnings:

  - You are about to drop the column `representanteId` on the `Cliente` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cliente" DROP CONSTRAINT "Cliente_representanteId_fkey";

-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "representanteId";

-- CreateTable
CREATE TABLE "_ClienteToRepresentante" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClienteToRepresentante_AB_unique" ON "_ClienteToRepresentante"("A", "B");

-- CreateIndex
CREATE INDEX "_ClienteToRepresentante_B_index" ON "_ClienteToRepresentante"("B");

-- AddForeignKey
ALTER TABLE "_ClienteToRepresentante" ADD CONSTRAINT "_ClienteToRepresentante_A_fkey" FOREIGN KEY ("A") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClienteToRepresentante" ADD CONSTRAINT "_ClienteToRepresentante_B_fkey" FOREIGN KEY ("B") REFERENCES "Representante"("id") ON DELETE CASCADE ON UPDATE CASCADE;
