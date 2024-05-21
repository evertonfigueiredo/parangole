-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_nivelAcessoId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "nivelAcessoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_nivelAcessoId_fkey" FOREIGN KEY ("nivelAcessoId") REFERENCES "NivelAcesso"("id") ON DELETE SET NULL ON UPDATE CASCADE;
