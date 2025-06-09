import { makeEditPetUseCase } from '../../../use-cases/factories/make-edit-pet-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function editPet(request: FastifyRequest, reply: FastifyReply) {
  const editParamsSchema = z.object({
    petId: z.string().uuid(),
  })

  const editBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    age: z.enum(['puppy', 'adult', 'senior']).optional(),
    size: z.enum(['small', 'medium', 'large']).optional(),
    energy_level: z.enum(['low', 'medium', 'high']).optional(),
    independence_level: z.enum(['low', 'medium', 'high']).optional(),
    environment: z.enum(['small', 'medium', 'large']).optional(),
    sex: z.enum(['male', 'female']).optional(),
    type: z.enum(['dog', 'cat']).optional(),
    breed: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    is_adopted: z.boolean().optional(),
  })

  const { petId } = editParamsSchema.parse(request.params)
  const data = editBodySchema.parse(request.body)

  if (Object.keys(data).length === 0) {
    return reply.status(400).send({
      message: 'At least one field must be sent.',
    })
  }

  const editPetUseCase = makeEditPetUseCase()

  const pet = await editPetUseCase.execute({
    petId,
    ...data,
  })

  return reply.status(200).send({
    pet,
  })
}
