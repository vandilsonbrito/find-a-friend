import { makeGetPetUseCase } from '@/use-cases/factories/make-get-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetParmsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = getPetParmsSchema.parse(request.params)

  const getPetUseCase = makeGetPetUseCase()

  const { pet } = await getPetUseCase.execute({
    petId,
  })

  if (!pet) {
    return reply.status(404).send({
      message: 'Pet not found',
    })
  }
  return reply.status(200).send({
    pet,
  })
}
