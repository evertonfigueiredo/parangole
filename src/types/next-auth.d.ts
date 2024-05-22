/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'
import { User } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: {
      id: number
      name: string | null
      email: string
      telefone: string | null
      emailVerified: Date | null
      image: string | null
      nivelAcessoId: number | null
      createdAt: Date
      updatedAt: Date
    }
  }

  interface User {
    id: number
    name: string | null
    email: string
    telefone: string | null
    emailVerified: Date | null
    image: string | null
    nivelAcessoId: number | null
    createdAt: Date
    updatedAt: Date
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    nivelAcessoId: number | undefined
  }
}
