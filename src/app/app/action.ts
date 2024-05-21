import { auth } from '@/services/auth'

export async function getNivel() {
  const session = await auth()

  return session?.user.nivelAcessoId
}
