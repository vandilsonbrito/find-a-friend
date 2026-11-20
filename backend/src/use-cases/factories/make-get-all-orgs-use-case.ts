import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { GetAllOrgsUseCase } from '../orgs/get-all-orgs'

export function makeGetAllOrgsUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const petsRepository = new PrismaPetsRepository()
  const getAllOrgsUseCase = new GetAllOrgsUseCase(
    orgsRepository,
    petsRepository,
  )

  return getAllOrgsUseCase
}
