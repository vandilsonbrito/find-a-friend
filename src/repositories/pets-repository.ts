import { GetPetsAvailableForAdoptionUseCaseRequest } from '@/@types/get-pets-available-for-adoption-use-case'
import { Pet, Prisma } from '@prisma/client'

export interface IPetsRepository {
  findById(petId: string): Promise<Pet | null>
  create(data: Prisma.PetCreateInput): Promise<Pet>
  findManyByCityAndFilters(
    data: GetPetsAvailableForAdoptionUseCaseRequest,
  ): Promise<Pet[]>
}
