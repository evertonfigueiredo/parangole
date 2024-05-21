import prisma from '../database'

export const updateUser = async (input: { email: string }) => {
  const nivelPadrao = await prisma.nivelAcesso.findFirst({
    where: {
      descricao: 'Visitante',
    },
  })

  if (nivelPadrao) {
    await prisma.user.update({
      where: {
        email: input.email,
      },
      data: {
        nivelAcessoId: nivelPadrao.id,
      },
    })
  }
}
