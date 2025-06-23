import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { GetAllOrgsUseCase } from '../orgs/get-all-orgs'

export function makeGetAllOrgsUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const getAllOrgsUseCase = new GetAllOrgsUseCase(orgsRepository)

  return getAllOrgsUseCase
}
