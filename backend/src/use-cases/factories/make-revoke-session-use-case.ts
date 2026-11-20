import { PrismaRefreshTokensRepository } from '../../repositories/prisma/prisma-refresh-tokens-repository'
import { RevokeSessionUseCase } from '../sessions/revoke-session'

export function makeRevokeSessionUseCase() {
  const refreshTokensRepository = new PrismaRefreshTokensRepository()
  return new RevokeSessionUseCase(refreshTokensRepository)
}
