import { FastifyReply, FastifyRequest } from 'fastify'
import { AuthTokenPayload } from '../../utils/auth-tokens'
import { makeRevokeSessionUseCase } from '../../../use-cases/factories/make-revoke-session-use-case'

export async function logout(request: FastifyRequest, reply: FastifyReply) {
  const { sub: orgId } = request.user as { sub: string }
  const refreshToken = request.cookies?.refreshToken

  if (refreshToken) {
    let decoded: AuthTokenPayload | null = null
    try {
      decoded = request.server.jwt.verify<AuthTokenPayload>(refreshToken)
    } catch {
      // Token inválido/vencido: não há o que revogar. O logout segue.
    }

    if (decoded?.type === 'refresh' && decoded.jti) {
      const revokeSessionUseCase = makeRevokeSessionUseCase()
      await revokeSessionUseCase.execute({ sessionId: decoded.jti, orgId })
    }
  }

  return reply
    .clearCookie('refreshToken', { path: '/' })
    .status(200)
    .send({ message: 'Logout realizado com sucesso.' })
}
