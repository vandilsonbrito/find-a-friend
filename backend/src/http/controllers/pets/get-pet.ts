import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function getPet(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getPetParmsSchema = z.object({
    petId: z.string().uuid(),
  })

  const {
    petId,
  } = getPetParmsSchema.parse(request.params)

  const getPetUseCase = makeGetPetUseCase()

  const pets_data = await getPetUseCase.execute({
    petId,
  })

  return reply.status(200).send({
    pets_data,
  })
}
