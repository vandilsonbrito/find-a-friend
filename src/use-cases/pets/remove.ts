import { IPetsRepository } from '@/repositories/pets-repository'
import { PetsNotFoundError } from '../errors/pet-not-found-error'

interface RemovePetUseCaseRequest {
  petId: string
}

export class RemovePetUseCase {
  private petsRepository: IPetsRepository
  constructor(petsRepository: IPetsRepository) {
    this.petsRepository = petsRepository
  }

  async execute(data: RemovePetUseCaseRequest): Promise<void> {
    const pet = await this.petsRepository.findById(data.petId)

    if (!pet) {
      throw new PetsNotFoundError()
    }

    await this.petsRepository.delete(pet.id)
  }
}
