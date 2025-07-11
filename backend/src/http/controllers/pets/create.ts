import { registerPetBodySchema } from '@/docs/schemas/pets'
import { makeRegisterPetUseCase } from '../../../use-cases/factories/make-register-pet-use-case'
import { streamToBuffer } from '../../../utils/streamToBuffer'
import { FastifyRequest, FastifyReply } from 'fastify'
import { ZodError } from 'zod'

export async function createPet(request: FastifyRequest, reply: FastifyReply) {
  const body: Record<string, string> = {}
  const uploadedPhotos: { buffer: Buffer; filename: string }[] = []

  try {
    const parts = request.parts()

    for await (const part of parts) {
      if (part.type === 'file') {
        const buf = await streamToBuffer(part.file)
        uploadedPhotos.push({
          buffer: buf,
          filename: part.filename,
        })
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
      org_id,
    } = registerPetBodySchema.parse(body)

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
      org_id,
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

    if (err instanceof Error) {
      return reply.status(400).send({ message: err.message })
    }

    return reply.status(500).send({ message: 'Internal server error' })
  }
}
