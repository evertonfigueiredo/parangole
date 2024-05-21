'use server'

import { auth } from '@/services/auth'

export async function getRedirect() {
  const session = await auth()

  const nivelAcessoId = session?.user?.nivelAcessoId

  let redirect = ''

  switch (nivelAcessoId) {
    case 1:
      redirect = '/app/master'
      break

    case 2:
      redirect = '/app/administrador'
      break

    case 3:
      redirect = '/app/cliente'
      break

    case 4:
      redirect = '/app/representante'
      break

    case 5:
      redirect = '/app/visitante'
      break

    default:
      break
  }

  return redirect
}
