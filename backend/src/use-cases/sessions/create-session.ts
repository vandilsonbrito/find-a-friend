import { IRefreshTokensRepository } from '../../repositories/refresh-tokens-repository'
import { REFRESH_TOKEN_TTL_SECONDS } from './session-config'

interface CreateSessionUseCaseRequest {
  orgId: string
}

interface CreateSessionUseCaseResponse {
  sessionId: string
}

export class CreateSessionUseCase {
  private refreshTokensRepository: IRefreshTokensRepository
  constructor(refreshTokensRepository: IRefreshTokensRepository) {
    this.refreshTokensRepository = refreshTokensRepository
  }

  async execute({
    orgId,
  }: CreateSessionUseCaseRequest): Promise<CreateSessionUseCaseResponse> {
    const now = new Date()

    await this.refreshTokensRepository.deleteExpiredByOrg(orgId, now)

    const session = await this.refreshTokensRepository.create({
      orgId,
      expiresAt: new Date(now.getTime() + REFRESH_TOKEN_TTL_SECONDS * 1000),
    })

    return { sessionId: session.id }
  }
}
