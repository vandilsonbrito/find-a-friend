import { InvalidCredentialsError } from '../../../use-cases/errors/invalid-credentials-error'
import { makeAuthenticateOrgUseCase } from '../../../use-cases/factories/make-authenticate-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import {
  refreshTokenCookieOptions,
  signAuthTokens,
} from '../../utils/auth-tokens'
import { makeCreateSessionUseCase } from '../../../use-cases/factories/make-create-session-use-case'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateOrgUseCase()
    const { org } = await authenticateUseCase.execute({
      email,
      password,
    })

    const createSessionUseCase = makeCreateSessionUseCase()
    const { sessionId } = await createSessionUseCase.execute({ orgId: org.id })

    const { accessToken, refreshToken } = await signAuthTokens(
      reply,
      org.id,
      sessionId,
    )

    return reply
      .setCookie('refreshToken', refreshToken, refreshTokenCookieOptions())
      .status(200)
      .send({
        message: 'Authentication successful.',
        accessToken,
      })
  } catch (err) {
    if (err instanceof Error) {
      if (err instanceof InvalidCredentialsError) {
        return reply.status(401).send({ message: err.message })
      }
      return reply.status(500).send()
    }
  }
}
