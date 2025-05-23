import { PrismaPetsRepository } from '../../repositories/prisma/prisma-pets-repository'
import { RemovePetUseCase } from '../pets/remove'

export function makeRemovePetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const removePetUseCase = new RemovePetUseCase(petsRepository)

  return removePetUseCase
}
