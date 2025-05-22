import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { EdiPetUseCase } from '../pets/edit'

export function makeEditPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const editPetUseCase = new EdiPetUseCase(petsRepository)

  return editPetUseCase
}
