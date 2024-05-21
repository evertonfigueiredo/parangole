'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import logo from '@/imagens/parangole-logo.png'
import { verificarPermissao } from '@/lib/verificarPermissao'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function PageMaster() {
  const router = useRouter()
  async function verificar() {
    const result = await verificarPermissao('Visitante')
    if (result && !result.status) {
      console.log(`/app/${result.nivelAcesso}`)
      router.push(`/app/${result.nivelAcesso?.toLowerCase()}`)
    }
  }

  verificar()
  return (
    <section className="flex h-screen w-full items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">
            <Image src={logo} alt="Logo da Parangolé" />
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Seja bem-vindo ao nosso sistema de vendas interno.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </section>
  )
}
