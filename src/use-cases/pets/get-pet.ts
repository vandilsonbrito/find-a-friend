import { IPetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { PetsNotFoundError } from '../errors/pet-not-found-error'

interface GetPetUseCaseRequest {
  petId: string
}
interface GetPetUseCaseResponse {
  pet: Pet
}

export class GetPetUseCase {
  private petsRepository: IPetsRepository
  constructor(petsRepository: IPetsRepository) {
    this.petsRepository = petsRepository
  }

  async execute(data: GetPetUseCaseRequest): Promise<GetPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(data.petId)

    if (!pet) {
      throw new PetsNotFoundError()
    }

    return { pet }
  }
}
