import { makeGetAvailablePetsUseCase } from '../../../use-cases/factories/make-get-available-pets-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z, ZodError } from 'zod'

export async function getAvailablePetsForAdoption(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAvailablePetsForAdoptionQuerySchema = z.object({
    city: z.string().optional(),
    age: z.enum(['puppy', 'adult', 'senior']).optional(),
    size: z.enum(['small', 'medium', 'large']).optional(),
    energy_level: z.enum(['low', 'medium', 'high']).optional(),
    independence_level: z.enum(['low', 'medium', 'high']).optional(),
    environment: z.enum(['small', 'medium', 'large']).optional(),
    sex: z.enum(['male', 'female']).optional(),
    type: z.enum(['dog', 'cat']).optional(),
    page: z.coerce.number().default(1),
  })

  const {
    city,
    age,
    size,
    energy_level,
    independence_level,
    environment,
    type,
    sex,
    page,
  } = getAvailablePetsForAdoptionQuerySchema.parse(request.query)

  const getAvailablePetsForAdoptionUseCase = makeGetAvailablePetsUseCase()

  const pets = await getAvailablePetsForAdoptionUseCase.execute({
    city,
    age,
    size,
    energy_level,
    independence_level,
    environment,
    type,
    sex,
    page,
  })

  return reply.status(200).send({
    pets,
  })
}
