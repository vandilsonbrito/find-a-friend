import { IRefreshTokensRepository } from '../../repositories/refresh-tokens-repository'

interface RevokeSessionUseCaseRequest {
  sessionId: string
  orgId: string
}

export class RevokeSessionUseCase {
  private refreshTokensRepository: IRefreshTokensRepository
  constructor(refreshTokensRepository: IRefreshTokensRepository) {
    this.refreshTokensRepository = refreshTokensRepository
  }

  async execute({
    sessionId,
    orgId,
  }: RevokeSessionUseCaseRequest): Promise<void> {
    const session = await this.refreshTokensRepository.findById(sessionId)

    if (!session || session.org_id !== orgId || session.revoked_at) {
      return
    }

    await this.refreshTokensRepository.revoke(session.id, new Date())
  }
}
