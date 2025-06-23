import { PrismaOrgsRepository } from '../../repositories/prisma/prisma-orgs-repository'
import { AuthenticateOrgUseCase } from '../orgs/authenticate'

export function makeAuthenticateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const authenticateOrgUseCase = new AuthenticateOrgUseCase(orgsRepository)

  return authenticateOrgUseCase
}
