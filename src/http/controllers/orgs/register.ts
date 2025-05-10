import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    whatsapp: z.string().min(10).max(11),
    address: z.string(),
    city: z.string(),
  })

  const { name, email, password, whatsapp, address, city } =
    registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()
    await registerUseCase.execute({
      name,
      email,
      password,
      whatsapp,
      address,
      city,
    })
  } catch (err) {
    if (err instanceof Error) {
      if (err instanceof OrgAlreadyExistsError) {
        return reply.status(409).send({ message: err.message })
      }
      return reply.status(500).send()
    }
  }

  return reply.status(201).send()
}
