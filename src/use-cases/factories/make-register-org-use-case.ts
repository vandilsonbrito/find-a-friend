import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { RegisterOrgUseCase } from '../orgs/register'

export function makeRegisterOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const registerOrgUseCase = new RegisterOrgUseCase(orgsRepository)

  return registerOrgUseCase
}
