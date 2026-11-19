import { registerPetBodySchema } from '@/docs/schemas/pets'
import { makeRegisterPetUseCase } from '../../../use-cases/factories/make-register-pet-use-case'
import { streamToBuffer } from '../../../utils/streamToBuffer'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ZodError } from 'zod'
import { CreatePetPhotosError } from '@/use-cases/errors/create-pet-photos-error'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const body: Record<string, string> = {}
  const uploadedPhotos: { buffer: Buffer }[] = []

  try {
    const parts = request.parts()

    for await (const part of parts) {
      if (part.type === 'file') {
        const buf = await streamToBuffer(part.file)
        uploadedPhotos.push({ buffer: buf })
      } else {
        body[part.fieldname as string] = part.value as string
      }
    }

    const {
      name,
      description,
      age,
      size,
      energy_level,
      independence_level,
      environment,
      sex,
      breed,
      type,
      city,
      state,
    } = registerPetBodySchema.parse(body)

    const { sub: orgId } = request.user as { sub: string }

    const registerPetsUseCase = makeRegisterPetUseCase()

    const { pet } = await registerPetsUseCase.execute({
      name,
      description,
      age,
      size,
      energy_level,
      independence_level,
      environment,
      sex,
      type,
      breed,
      city,
      state,
      org_id: orgId,
      photos: uploadedPhotos,
    })

    return reply.status(201).send({ pet })
  } catch (err) {
    if (err instanceof ZodError) {
      return reply.status(400).send({
        message: 'Error on validation data on request',
        issues: err.errors,
      })
    }

    if (err instanceof CreatePetPhotosError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
}
