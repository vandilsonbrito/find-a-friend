import { getAvailablePetsForAdoptionQuerySchema } from '@/docs/schemas/pets'
import { makeGetAvailablePetsUseCase } from '../../../use-cases/factories/make-get-available-pets-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'

export async function getAvailablePetsForAdoption(
  request: FastifyRequest,
  reply: FastifyReply,
) {
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

  const pets_data = await getAvailablePetsForAdoptionUseCase.execute({
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
    ...pets_data,
  })
}
