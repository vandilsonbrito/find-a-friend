import { IRefreshTokensRepository } from '../../repositories/refresh-tokens-repository'
import { InvalidRefreshTokenError } from '../errors/invalid-refresh-token-error'
import { REFRESH_TOKEN_TTL_SECONDS, REUSE_INTERVAL_MS } from './session-config'

interface RotateSessionUseCaseRequest {
  sessionId: string
  orgId: string
}

interface RotateSessionUseCaseResponse {
  sessionId: string
}

export class RotateSessionUseCase {
  private refreshTokensRepository: IRefreshTokensRepository
  constructor(refreshTokensRepository: IRefreshTokensRepository) {
    this.refreshTokensRepository = refreshTokensRepository
  }

  async execute({
    sessionId,
    orgId,
  }: RotateSessionUseCaseRequest): Promise<RotateSessionUseCaseResponse> {
    const now = new Date()
    const session = await this.refreshTokensRepository.findById(sessionId)

    if (
      !session ||
      session.org_id !== orgId ||
      session.expires_at <= now ||
      session.revoked_at
    ) {
      throw new InvalidRefreshTokenError()
    }

    if (session.replaced_at) {
      const replacedForMs = now.getTime() - session.replaced_at.getTime()

      if (replacedForMs > REUSE_INTERVAL_MS) {
        await this.refreshTokensRepository.revokeAllByOrg(orgId, now)
        throw new InvalidRefreshTokenError()
      }
      // Dentro da tolerância: segue e emite uma sessão nova (StrictMode/abas).
    } else {
      await this.refreshTokensRepository.markAsReplaced(session.id, now)
    }

    const newSession = await this.refreshTokensRepository.create({
      orgId,
      expiresAt: new Date(now.getTime() + REFRESH_TOKEN_TTL_SECONDS * 1000),
    })

    return { sessionId: newSession.id }
  }
}
