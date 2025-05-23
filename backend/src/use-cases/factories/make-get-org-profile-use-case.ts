import { PrismaOrgsRepository } from '../../repositories/prisma/prisma-orgs-repository'
import { GetOrgProfileUseCase } from '../orgs/get-org-profile'

export function makeGetOrgProfileUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const getProfileUseCase = new GetOrgProfileUseCase(orgsRepository)

  return getProfileUseCase
}
