'use client'

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import logo from '@/imagens/parangole-logo.png'
import Image from 'next/image'

export default function PageVisitante() {
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
        <CardContent className="text-center">
          Por favor, entre em contato para desbloquear seu cadastro.
          <p>suporte@parangolekids.com</p>
        </CardContent>
      </Card>
    </section>
  )
}
