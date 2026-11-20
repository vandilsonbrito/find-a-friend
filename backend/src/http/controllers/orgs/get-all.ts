import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetAllOrgsUseCase } from '@/use-cases/factories/make-get-all-orgs-use-case'

export async function allOrgs(request: FastifyRequest, reply: FastifyReply) {
  const getAllOrgUseCase = makeGetAllOrgsUseCase()

  const { orgs } = await getAllOrgUseCase.execute()

  const orgsList = orgs.map((org) => ({
    id: org.id,
    name: org.name,
    description: org.description,
    address: org.address,
    city: org.city,
    cep: org.cep,
    state: org.state,
    whatsapp: org.whatsapp,
    pets_count: org.available_pets_count,
    created_at: org.created_at,
  }))

  return reply.status(200).send({
    orgsList,
    totalOrgs: orgs.length,
  })
}
