'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import logo from '@/imagens/parangole-logo.png'
import Image from 'next/image'
import { createClient } from './action'
import { useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'

export default function PageRepresentante() {
  const form = useForm()

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      // console.log('teste')
      const result = await createClient(data)
      if (result.status) {
        form.reset({ email: '' })
        toast({
          title: 'Sucesso!',
          description: result.message,
        })
      } else {
        toast({
          title: 'Error!',
          description: result.message,
        })
      }
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <section className="flex h-screen w-full items-center justify-center bg-gray-100 px-4 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">
            <Image src={logo} alt="Logo da Parangolé" />
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Seja bem-vindo ao nosso sistema de vendas interno. Por favor, entre
            em contato com nossos representantes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="sr-only" htmlFor="email">
                Email
              </Label>
              <Input
                id="email"
                placeholder="Insira seu E-mail"
                required
                type="email"
                {...form.register('email')}
              />
            </div>
            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting
                ? 'Cadastrando Cliente...'
                : 'Cadastrar Cliente'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  )
}
