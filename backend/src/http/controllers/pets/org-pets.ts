import { makeGetOrgPetsUseCase } from '@/use-cases/factories/make-get-org-pets-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export async function getOrgPets(request: FastifyRequest, reply: FastifyReply) {
  const getOrgPetsParamsSchema = z.object({
    orgId: z.string().uuid(),
    page: z.coerce.number().default(1),
  })
  const { orgId, page } = getOrgPetsParamsSchema.parse(request.params)

  const getOrgPetsUseCase = makeGetOrgPetsUseCase()

  const { pets, total_pets, current_page, total_pages } =
    await getOrgPetsUseCase.execute({
      orgId,
      page,
    })

  return reply.status(200).send({
    pets,
    total_pets,
    current_page,
    total_pages,
  })
}
