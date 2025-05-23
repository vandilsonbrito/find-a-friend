import { makeRegisterOrgUseCase } from '../../../use-cases/factories/make-register-org-use-case'
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

  const registerUseCase = makeRegisterOrgUseCase()
  await registerUseCase.execute({
    name,
    email,
    password,
    whatsapp,
    address,
    city,
  })

  return reply.status(201).send()
}
