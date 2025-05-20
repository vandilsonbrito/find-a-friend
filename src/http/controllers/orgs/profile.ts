import { OrgNotFoundError } from '@/use-cases/errors/org-not-found-error'
import { makeGetOrgProfileUseCase } from '@/use-cases/factories/make-get-org-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function orgProfile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const { sub } = (request.user as { sign: { sub: string } }).sign
  const getOrgProfile = makeGetOrgProfileUseCase()

  const { org } = await getOrgProfile.execute({
    orgId: sub,
  })

  if (!org) {
    throw new OrgNotFoundError()
  }

  return reply.status(200).send({
    org: {
      ...org,
      password_hash: undefined,
    },
  })
}
