import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  const niveis = [
    'MASTER',
    'Administrador',
    'Representante',
    'Cliente',
    'Visitante',
  ]

  niveis.map(
    async (nome) =>
      await prisma.nivelAcesso.create({
        data: {
          descricao: nome,
        },
      }),
  )
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
