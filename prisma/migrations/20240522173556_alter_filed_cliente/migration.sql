/*
  Warnings:

  - You are about to drop the column `empresaId` on the `Cliente` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cliente" DROP CONSTRAINT "Cliente_empresaId_fkey";

-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "empresaId";

-- CreateTable
CREATE TABLE "_ClienteToEmpresa" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ClienteToEmpresa_AB_unique" ON "_ClienteToEmpresa"("A", "B");

-- CreateIndex
CREATE INDEX "_ClienteToEmpresa_B_index" ON "_ClienteToEmpresa"("B");

-- AddForeignKey
ALTER TABLE "_ClienteToEmpresa" ADD CONSTRAINT "_ClienteToEmpresa_A_fkey" FOREIGN KEY ("A") REFERENCES "Cliente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ClienteToEmpresa" ADD CONSTRAINT "_ClienteToEmpresa_B_fkey" FOREIGN KEY ("B") REFERENCES "Empresa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
