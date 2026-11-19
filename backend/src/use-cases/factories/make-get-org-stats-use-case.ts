import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetOrgStatsUseCase } from '../pets/get-org-stats'

export function makeGetOrgStatsUseCase() {
  const petsRepository = new PrismaPetsRepository()

  return new GetOrgStatsUseCase(petsRepository)
}
