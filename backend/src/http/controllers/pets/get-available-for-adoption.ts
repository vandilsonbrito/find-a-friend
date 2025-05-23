import { makeGetAvailablePetsUseCase } from '../../../use-cases/factories/make-get-available-pets-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z, ZodError } from 'zod'

export async function getAvailablePetsForAdoption(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getAvailablePetsForAdoptionQuerySchema = z.object({
    city: z.string(),
    age: z.enum(['puppy', 'adult', 'senior']).optional(),
    size: z.enum(['small', 'medium', 'large']).optional(),
    energy_level: z.enum(['low', 'medium', 'high']).optional(),
    independence_level: z.enum(['low', 'medium', 'high']).optional(),
    environment: z.enum(['small', 'medium', 'large']).optional(),
    page: z.coerce.number().default(1),
  })

  try {
    const {
      city,
      age,
      size,
      energy_level,
      independence_level,
      environment,
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
      page,
    })

    return reply.status(200).send({
      pets,
    })
  } catch (err) {
    if (err instanceof ZodError) {
      return reply.status(400).send({ message: err.message })
    }
    return reply.status(500).send()
  }
}
