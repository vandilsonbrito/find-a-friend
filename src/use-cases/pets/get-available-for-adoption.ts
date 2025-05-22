import { IPetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetsNotFoundError } from '../errors/pet-not-found-error'
import { GetPetsAvailableForAdoptionUseCaseRequest } from '@/@types/get-pets-available-for-adoption-use-case'
import { normalizeCityName } from '@/utils/normalizeCityName'

interface GetPetsAvailableForAdoptionUseCaseResponse {
  pets: Pet[]
}

export class GetPetsAvailableForAdoptionUseCase {
  private petsRepository: IPetsRepository
  constructor(petsRepository: IPetsRepository) {
    this.petsRepository = petsRepository
  }

  async execute(
    data: GetPetsAvailableForAdoptionUseCaseRequest,
  ): Promise<GetPetsAvailableForAdoptionUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCityAndFilters({
      city: normalizeCityName(data.city),
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment: data.environment,
      page: data.page,
    })

    if (!pets) {
      throw new PetsNotFoundError()
    }

    return { pets }
  }
}
