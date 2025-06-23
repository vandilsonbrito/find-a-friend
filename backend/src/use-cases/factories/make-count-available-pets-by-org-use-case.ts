import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CountAvailablePetsByOrgUseCase } from '../pets/count-available-pets-by-org'

export function makeCountAvailablePetsByOrgUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const countAvailablePetsByOrgUseCase = new CountAvailablePetsByOrgUseCase(petsRepository)

  return countAvailablePetsByOrgUseCase
}