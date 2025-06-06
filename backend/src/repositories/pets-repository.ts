import { GetPetsAvailableForAdoptionUseCaseRequest } from '../@types/get-pets-available-for-adoption-use-case'
import { Pet, Prisma } from '@prisma/client'
import { PetWithPhoto } from './prisma/prisma-pets-repository'

export interface IPetsRepository {
  update(data: Prisma.PetUpdateInput): Promise<Pet>
  delete(petId: string): Promise<void>
  save(pet: Pet): Promise<Pet>
  findById(petId: string): Promise<PetWithPhoto | null>
  create(data: Prisma.PetCreateInput): Promise<Pet>
  findAvailablePets(data: GetPetsAvailableForAdoptionUseCaseRequest): Promise<{
    pets: Pet[]
    total_pets: number
    current_page: number
    total_pages: number
  }>
  findManyByOrgId(orgId: string, page: number): Promise<Pet[]>
  countAvailablePetsByOrg(orgId: string): Promise<number>
}
