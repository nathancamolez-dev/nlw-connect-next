'use client'
import { Button } from '@/components/button'
import { InputField, InputIcon, InputRoot } from '@/components/input'
import { postSubscriptions } from '@/http/api'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, Mail, User } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const subscriptionsFormSchema = z.object({
  name: z.string().min(2, 'Digite seu nome completo'),
  email: z.string().email('Digite um email valido'),
})

type SubscriptionSchema = z.infer<typeof subscriptionsFormSchema>

export function SubscriptionForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubscriptionSchema>({
    resolver: zodResolver(subscriptionsFormSchema),
  })

  async function onSubscribe({ name, email }: SubscriptionSchema) {
    const referrer = searchParams.get('referrer')
    const { subscriberId } = await postSubscriptions({ name, email, referrer })

    router.push(`/invite/${subscriberId}`)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubscribe)}
      className="bg-gray-700 border boder-gray-600 rounded-2xl p-8 space-y-6 w-full md:max-w-[440px]"
    >
      <h2 className="font-heading font-semibold text-gray-200 text-xl">
        Inscrição
      </h2>

      <div className="space-y-3">
        <div className="space-y-2">
          <InputRoot>
            <InputIcon>
              <User />
            </InputIcon>
            <InputField
              type="text"
              placeholder="Seu nome"
              {...register('name')}
            />
          </InputRoot>

          {errors?.name && (
            <p className="text-danger text-xs font-semibold">
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <InputRoot>
            <InputIcon>
              <Mail />
            </InputIcon>
            <InputField
              type="email"
              placeholder="Seu e-email"
              {...register('email')}
            />
          </InputRoot>

          {errors?.email && (
            <p className="text-danger text-xs font-semibold">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit">
        Confirmar
        <ArrowRight />
      </Button>
    </form>
  )
}
