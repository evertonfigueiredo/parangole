/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { auth } from '@/services/auth'
import prisma from '@/services/database'

export async function createClient(data: any) {
  try {
    const session = await auth()

    if (!session?.user.id) {
      throw new Error('User ID is required')
    }

    const nivelAcesso = await prisma.nivelAcesso.findFirst({
      where: { descricao: 'Cliente' }, // or any other nivelAcesso you have
    })

    if (!nivelAcesso) {
      const retorno = {
        status: false,
        message: 'Não foi possível cadastrar cliente.',
        data: {},
      }
      await prisma.$disconnect()
      return retorno
    }

    const representante = await prisma.representante.findFirst({
      where: { usuarioId: session.user.id },
    })

    if (!representante) {
      const retorno = {
        status: false,
        message: 'Não foi possível cadastrar cliente.',
        data: {},
      }
      await prisma.$disconnect()
      return retorno
    }

    const user = await prisma.user.create({
      data: {
        email: data.email,
        nivelAcessoId: nivelAcesso?.id,
        empresas: {
          connect: [{ id: representante.empresaId }],
        },
      },
    })

    const client = await prisma.cliente.create({
      data: {
        representantes: {
          connect: {
            id: representante.id,
          },
        },
        usuarioId: user.id,
        empresas: {
          connect: {
            id: representante.empresaId,
          },
        },
      },
    })

    const retorno = {
      status: true,
      message: 'Cliente cadastrado com sucesso!',
      data: { user, client },
    }
    await prisma.$disconnect()
    return retorno
  } catch (error) {
    const retorno = {
      status: false,
      message: 'Cliente ja cadastrado!',
      data: {},
    }
    await prisma.$disconnect()
    return retorno
  }
}
