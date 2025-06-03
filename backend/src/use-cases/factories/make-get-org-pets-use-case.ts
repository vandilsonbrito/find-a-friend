import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { GetOrgPetsUseCase } from '../pets/get-org-pets'

export function makeGetOrgPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const getProfileUseCase = new GetOrgPetsUseCase(
    petsRepository,
  )

  return getProfileUseCase
}
