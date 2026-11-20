import { IPetsRepository } from '../../repositories/pets-repository'
import { PetsNotFoundError } from '../errors/pet-not-found-error'
import { NotAllowedError } from '../errors/not-allowed-error'

interface RemovePetUseCaseRequest {
  petId: string
  orgId: string
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

    if (pet.org_id !== data.orgId) {
      throw new NotAllowedError()
    }

    await this.petsRepository.delete(pet.id)
  }
}
