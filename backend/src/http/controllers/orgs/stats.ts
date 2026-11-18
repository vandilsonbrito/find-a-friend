import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetOrgStatsUseCase } from '../../../use-cases/factories/make-get-org-stats-use-case'

export async function orgStats(request: FastifyRequest, reply: FastifyReply) {
  const { sub } = request.user as { sub: string }

  const getOrgStats = makeGetOrgStatsUseCase()
  const { stats } = await getOrgStats.execute({ orgId: sub })

  return reply.status(200).send({ stats })
}
