import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetAllOrgsUseCase } from '@/use-cases/factories/make-get-all-orgs-use-case'
import { makeCountAvailablePetsByOrgUseCase } from '@/use-cases/factories/make-count-available-pets-by-org-use-case'

export async function allOrgs(request: FastifyRequest, reply: FastifyReply) {
  const getAllOrgUseCase = makeGetAllOrgsUseCase()
  const countAvailablePetsByOrgUseCase = makeCountAvailablePetsByOrgUseCase()

  const { orgs } = await getAllOrgUseCase.execute()

  const totalOrgs = orgs.length

  const orgsList = await Promise.all(
    orgs.map(async (org) => {
      const { count } = await countAvailablePetsByOrgUseCase.execute(org.id)

      return {
        id: org.id,
        email: org.email,
        name: org.name,
        description: org.description,
        address: org.address,
        city: org.city,
        cep: org.cep,
        state: org.state,
        whatsapp: org.whatsapp,
        pets_count: count,
        created_at: org.created_at,
      }
    }),
  )

  return reply.status(200).send({
    orgsList,
    totalOrgs,
  })
}
