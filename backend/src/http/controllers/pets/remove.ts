import { makeRemovePetUseCase } from '../../../use-cases/factories/make-remove-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function removePet(request: FastifyRequest, reply: FastifyReply) {
  const removeParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const { petId } = removeParamsSchema.parse(request.params)

  const removePetUseCase = makeRemovePetUseCase()

  await removePetUseCase.execute({
    petId,
  })

  return reply.status(204).send()
}
