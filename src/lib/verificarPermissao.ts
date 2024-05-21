'use server'

import { auth } from '@/services/auth'
import prisma from '@/services/database'

export async function verificarPermissao(permissao: string) {
  try {
    const session = await auth()

    if (!session?.user) {
      throw new Error('Usuário não autenticado')
    }

    const retorno = await prisma.nivelAcesso.findFirst({
      where: {
        descricao: permissao,
      },
    })

    const result = session.user.nivelAcessoId === retorno?.id

    const nivel = await prisma.nivelAcesso.findFirst({
      where: {
        id: session.user.nivelAcessoId as number,
      },
    })

    if (!result) {
      console.log('AQUI A')

      return {
        status: result,
        nivelAcesso: nivel?.descricao,
      }
    }

    return {
      status: result,
      nivelAcesso: nivel?.descricao,
    }
  } catch (error) {
    console.error(error)
    return undefined // Ou você pode lançar uma exceção
  }
}
