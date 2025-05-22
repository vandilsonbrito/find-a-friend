import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetPetsAvailableForAdoptionUseCase } from '../pets/get-available-for-adoption'

export function makeGetAvailablePetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const getProfileUseCase = new GetPetsAvailableForAdoptionUseCase(
    petsRepository,
  )

  return getProfileUseCase
}
