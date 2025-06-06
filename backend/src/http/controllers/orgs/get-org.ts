import { makeGetOrgUseCase } from '@/use-cases/factories/make-get-org-use-case'
import { OrgNotFoundError } from '../../../use-cases/errors/org-not-found-error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function getOrg(request: FastifyRequest, reply: FastifyReply) {
  const editOrgParamsSchema = z.object({
    orgId: z.string().uuid(),
  })

  const { orgId } = editOrgParamsSchema.parse(request.params)

  const getOrgProfile = makeGetOrgUseCase()

  const { org } = await getOrgProfile.execute({
    orgId,
  })

  if (!org) {
    throw new OrgNotFoundError()
  }

  return reply.status(200).send({
    org: {
      ...org,
      email: undefined,
      password_hash: undefined,
    },
  })
}
