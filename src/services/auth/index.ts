/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import Nodemailer from 'next-auth/providers/nodemailer'
import prisma from '../database'
import { updateUser } from '../updateUser'

export const { auth, handlers } = NextAuth({
  pages: {
    signIn: '/auth',
    signOut: '/auth',
    error: '/auth',
    verifyRequest: '/auth',
    newUser: '/app',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    Nodemailer({
      server: {
        host: process.env.EMAIL_SERVER_HOST as string,
        port: parseInt(process.env.EMAIL_SERVER_PORT as string) || 0,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  events: {
    createUser: async (message: any) => {
      await updateUser({
        email: message.user.email as string,
      })
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, token }: any) {
      return {
        ...session,
        user: {
          id: token.id,
          name: token.name,
          email: token.email,
          telefone: token.telefone,
          emailVerified: token.emailVerified,
          image: token.image,
          nivelAcessoId: token.nivelAcessoId,
          createdAt: token.createdAt,
          updatedAt: token.updatedAt,
        },
      }
    },
    async jwt({ token, user }: any) {
      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          telefone: user.telefone,
          emailVerified: user.emailVerified,
          image: user.image,
          nivelAcessoId: user.nivelAcessoId,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        }
      }
      return token
    },
  },
})
