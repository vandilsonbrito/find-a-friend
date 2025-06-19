import { InvalidCredentialsError } from '../../../use-cases/errors/invalid-credentials-error'
import { makeAuthenticateOrgUseCase } from '../../../use-cases/factories/make-authenticate-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

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

    const accessToken = await reply.jwtSign(
      { sub: org.id },
      { expiresIn: '15m' }
    )

    const refreshToken = await reply.jwtSign(
      { sub: org.id },
      { expiresIn: '7d' },
    )

    const isProduction = process.env.NODE_ENV === 'production'

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .send({
        message: 'Authentication successful.',
        accessToken, 
      })
  } catch (err) {
    if (err instanceof Error) {
      if (err instanceof InvalidCredentialsError) {
        return reply.status(400).send({ message: err.message })
      }
      return reply.status(500).send()
    }
  }
}