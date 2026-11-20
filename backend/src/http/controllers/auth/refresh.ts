import { FastifyReply, FastifyRequest } from 'fastify'
import {
  AuthTokenPayload,
  refreshTokenCookieOptions,
  signAuthTokens,
} from '../../utils/auth-tokens'
import { makeRotateSessionUseCase } from '../../../use-cases/factories/make-rotate-session-use-case'
import { InvalidRefreshTokenError } from '../../../use-cases/errors/invalid-refresh-token-error'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  const refreshToken = request.cookies?.refreshToken

  if (!refreshToken) {
    return reply.status(401).send({ message: 'Refresh token missing.' })
  }

  let decoded: AuthTokenPayload
  try {
    decoded = request.server.jwt.verify<AuthTokenPayload>(refreshToken)
  } catch {
    return reply.status(401).send({ message: 'Invalid refresh token.' })
  }

  if (decoded.type !== 'refresh' || !decoded.jti) {
    return reply.status(401).send({ message: 'Invalid refresh token.' })
  }

  try {
    const rotateSessionUseCase = makeRotateSessionUseCase()
    const { sessionId } = await rotateSessionUseCase.execute({
      sessionId: decoded.jti,
      orgId: decoded.sub,
    })

    const { accessToken, refreshToken: newRefreshToken } = await signAuthTokens(
      reply,
      decoded.sub,
      sessionId,
    )

    return reply
      .setCookie('refreshToken', newRefreshToken, refreshTokenCookieOptions())
      .status(200)
      .send({
        message: 'Token refreshed successfully.',
        accessToken,
      })
  } catch (err) {
    if (err instanceof InvalidRefreshTokenError) {
      return reply.status(401).send({ message: err.message })
    }
    throw err
  }
}
