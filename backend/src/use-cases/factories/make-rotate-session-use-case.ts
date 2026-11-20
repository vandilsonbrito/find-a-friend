import { PrismaRefreshTokensRepository } from '../../repositories/prisma/prisma-refresh-tokens-repository'
import { RotateSessionUseCase } from '../sessions/rotate-session'

export function makeRotateSessionUseCase() {
  const refreshTokensRepository = new PrismaRefreshTokensRepository()
  return new RotateSessionUseCase(refreshTokensRepository)
}
