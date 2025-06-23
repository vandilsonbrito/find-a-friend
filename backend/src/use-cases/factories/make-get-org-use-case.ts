import { PrismaOrgsRepository } from '../../repositories/prisma/prisma-orgs-repository'
import { GetOrgProfileUseCase } from '../orgs/get-org-profile'

export function makeGetOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const getOrgUseCase = new GetOrgProfileUseCase(orgsRepository)

  return getOrgUseCase
}
