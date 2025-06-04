import { GetPetsAvailableForAdoptionUseCaseRequest } from '../@types/get-pets-available-for-adoption-use-case'
import { Pet, Prisma } from '@prisma/client'

export interface IPetsRepository {
  update(data: Prisma.PetUpdateInput): Promise<Pet>
  delete(petId: string): Promise<void>
  save(pet: Pet): Promise<Pet>
  findById(petId: string): Promise<Pet | null>
  create(data: Prisma.PetCreateInput): Promise<Pet>
  findAvailablePets(
    data: GetPetsAvailableForAdoptionUseCaseRequest,
  ): Promise<Pet[]>
  findManyByOrgId(orgId: string, page: number): Promise<Pet[]>
  countAvailablePetsByOrg(orgId: string): Promise<number>
}
