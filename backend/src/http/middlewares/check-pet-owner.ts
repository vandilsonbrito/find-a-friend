import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { z } from 'zod'

const editParamsSchema = z.object({
  petId: z.string().uuid(),
})

export async function checkPetOwner(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const userId = (request.user as { sub: string }).sub

  const { petId } = editParamsSchema.parse(request.params)

  const prismaPetsRepository = new PrismaPetsRepository()
  const pet = await prismaPetsRepository.findById(petId)
  if (!pet) {
    return reply.status(404).send({ message: 'Pet not found' })
  }

  if (pet.org_id !== userId) {
    return reply.status(403).send({ message: 'Forbidden' })
  }
}
