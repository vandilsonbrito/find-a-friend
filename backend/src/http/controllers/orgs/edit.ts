import { makeEditOrgUseCase } from '@/use-cases/factories/make-edit-org-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { UUID } from 'node:crypto'

export async function editOrg(request: FastifyRequest, reply: FastifyReply) {
  const editOrgParamsSchema = z.object({
    orgId: z.string().uuid(),
  })

  const editOrgBodySchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    whatsapp: z.string().min(10).max(11).optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    cep: z.string().optional(),
  })

  const { orgId } = editOrgParamsSchema.parse(request.params)
  const data = editOrgBodySchema.parse(request.body)

  if (Object.keys(data).length === 0) {
    return reply.status(400).send({
      message: 'At least one field must be sent.'
    })
  }

  if ((request.user as { sub: string }).sub !== orgId) {
    return reply.status(403).send({
      message: 'You are not allowed to edit this org profile.',
    })
  }

  const editOrgUseCase = makeEditOrgUseCase()

  const org = await editOrgUseCase.execute({
    id: orgId as UUID,
    ...data,
  })

  return reply.status(200).send({
    org,
  })
}
