import { FastifyReply } from 'fastify'

export type AuthTokenType = 'access' | 'refresh'

export interface AuthTokenPayload {
  sub: string
  type: AuthTokenType
}

export async function signAuthTokens(reply: FastifyReply, orgId: string) {
  const accessPayload: AuthTokenPayload = { sub: orgId, type: 'access' }
  const refreshPayload: AuthTokenPayload = { sub: orgId, type: 'refresh' }

  const [accessToken, refreshToken] = await Promise.all([
    reply.jwtSign(accessPayload, { expiresIn: '15m' }),
    reply.jwtSign(refreshPayload, { expiresIn: '7d' }),
  ])

  return { accessToken, refreshToken }
}
