import { IPetsRepository } from '../../repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetsNotFoundError } from '../errors/pet-not-found-error'
import { GetPetsAvailableForAdoptionUseCaseRequest } from '../../@types/get-pets-available-for-adoption-use-case'
import { normalizeCityName } from '../../utils/normalizeCityName'

interface GetPetsAvailableForAdoptionUseCaseResponse {
  pets: Pet[]
  total_pets: number
  current_page: number
  total_pages: number
}

export class GetPetsAvailableForAdoptionUseCase {
  private petsRepository: IPetsRepository
  constructor(petsRepository: IPetsRepository) {
    this.petsRepository = petsRepository
  }

  async execute(
    data: GetPetsAvailableForAdoptionUseCaseRequest,
  ): Promise<GetPetsAvailableForAdoptionUseCaseResponse> {
    const petsResponse = await this.petsRepository.findAvailablePets({
      city: data?.city && normalizeCityName(data.city),
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence_level: data.independence_level,
      environment: data.environment,
      type: data.type,
      sex: data.sex,
      page: data.page,
    })
    if (!petsResponse.pets) {
      throw new PetsNotFoundError()
    }

    return {
      pets: petsResponse.pets,
      total_pets: petsResponse.total_pets,
      current_page: petsResponse.current_page,
      total_pages: petsResponse.total_pages,
    }
  }
}
