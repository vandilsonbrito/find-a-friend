import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository"
import { GetPetUseCase } from "../pets/get-pet"

export function makeGetPetUseCase() {
  const orgsRepository = new PrismaPetsRepository()
  const getProfileUseCase = new GetPetUseCase(orgsRepository)

  return getProfileUseCase
}
