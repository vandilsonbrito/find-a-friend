import { PrismaRefreshTokensRepository } from '../../repositories/prisma/prisma-refresh-tokens-repository'
import { CreateSessionUseCase } from '../sessions/create-session'

export function makeCreateSessionUseCase() {
  const refreshTokensRepository = new PrismaRefreshTokensRepository()
  return new CreateSessionUseCase(refreshTokensRepository)
}
