import { IPetsRepository } from '../../repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetsNotFoundError } from '../errors/pet-not-found-error'

interface GetOrgPetsUseCaseRequest {
  orgId: string
  page: number
}
interface GetOrgPetsUseCaseResponse {
  pets: Pet[]
  total_pets: number
  current_page: number
  total_pages: number
}

export class GetOrgPetsUseCase {
  private petsRepository: IPetsRepository
  constructor(petsRepository: IPetsRepository) {
    this.petsRepository = petsRepository
  }

  async execute(
    data: GetOrgPetsUseCaseRequest,
  ): Promise<GetOrgPetsUseCaseResponse> {
    const { pets, total_pets, current_page, total_pages } = await this.petsRepository.findManyByOrgId(
      data.orgId,
      data.page,
    )

    if (!pets) {
      throw new PetsNotFoundError()
    }

    return {
      pets,
      total_pets,
      current_page,
      total_pages,
    }
  }
}
