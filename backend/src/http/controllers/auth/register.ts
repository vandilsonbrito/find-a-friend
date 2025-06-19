import { makeRegisterOrgUseCase } from '../../../use-cases/factories/make-register-org-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { OrgAlreadyExistsError } from 'src/use-cases/errors/org-already-exists-error'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    description: z.string(),
    password: z.string().min(6),
    whatsapp: z.string().min(10).max(11),
    address: z.string(),
    city: z.string(),
    state: z.string(),
    cep: z.string(),
  })

  const {
    name,
    description,
    email,
    password,
    whatsapp,
    address,
    city,
    state,
    cep,
  } = registerBodySchema.parse(request.body)

  const registerUseCase = makeRegisterOrgUseCase()

  try {
    const { org } = await registerUseCase.execute({
      name,
      description,
      email,
      password,
      whatsapp,
      address,
      city,
      state,
      cep,
    })

    const { password_hash: _, ...orgWithoutPassword } = org

    return reply.status(201).send({
      org: orgWithoutPassword,
    })
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }
  }
}
