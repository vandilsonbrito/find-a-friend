import { FastifyReply } from 'fastify'
import { REFRESH_TOKEN_TTL_SECONDS } from '@/use-cases/sessions/session-config'

export type AuthTokenType = 'access' | 'refresh'

export interface AuthTokenPayload {
  sub: string
  type: AuthTokenType
  jti?: string
}

export async function signAuthTokens(
  reply: FastifyReply,
  orgId: string,
  sessionId: string,
) {
  const accessPayload: AuthTokenPayload = { sub: orgId, type: 'access' }
  const refreshPayload: AuthTokenPayload = {
    sub: orgId,
    type: 'refresh',
    jti: sessionId,
  }

  const [accessToken, refreshToken] = await Promise.all([
    reply.jwtSign(accessPayload, { expiresIn: '15m' }),
    reply.jwtSign(refreshPayload, { expiresIn: REFRESH_TOKEN_TTL_SECONDS }),
  ])

  return { accessToken, refreshToken }
}

export function refreshTokenCookieOptions() {
  const isProduction = process.env.NODE_ENV === 'production'

  return {
    path: '/',
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? ('none' as const) : ('lax' as const),
    maxAge: REFRESH_TOKEN_TTL_SECONDS,
  }
}
