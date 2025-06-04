import { IPetsRepository } from '../../repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetsNotFoundError } from '../errors/pet-not-found-error'

interface GetOrgPetsUseCaseRequest {
  orgId: string
  page: number
}
interface GetOrgPetsUseCaseResponse {
  pets: Pet[]
}

export class GetOrgPetsUseCase {
  private petsRepository: IPetsRepository
  constructor(petsRepository: IPetsRepository) {
    this.petsRepository = petsRepository
  }

  async execute(
    data: GetOrgPetsUseCaseRequest,
  ): Promise<GetOrgPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyByOrgId(
      data.orgId,
      data.page,
    )

    if (!pets) {
      throw new PetsNotFoundError()
    }

    return { pets }
  }
}
