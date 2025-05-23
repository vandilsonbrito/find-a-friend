import { IPetsRepository } from '../../repositories/pets-repository'
import {
  Age,
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Pet,
  Size,
} from '@prisma/client'
import { PetsNotFoundError } from '../errors/pet-not-found-error'

interface EdiPetUseCaseRequest {
  petId: string
  name?: string
  description?: string
  age?: Age
  size?: Size
  energy_level?: EnergyLevel
  independence_level?: IndependenceLevel
  environment?: Environment
  city?: string
}
interface EdiPetUseCaseResponse {
  petUpdated: Pet
}

export class EdiPetUseCase {
  private petsRepository: IPetsRepository
  constructor(petsRepository: IPetsRepository) {
    this.petsRepository = petsRepository
  }

  async execute(data: EdiPetUseCaseRequest): Promise<EdiPetUseCaseResponse> {
    const pet = await this.petsRepository.findById(data.petId)

    if (!pet) {
      throw new PetsNotFoundError()
    }

    const petUpdated = await this.petsRepository.update({
      id: data.petId,
      name: data.name || pet.name,
      description: data.description || pet.description,
      age: data.age || pet.age,
      size: data.size || pet.size,
      energy_level: data.energy_level || pet.energy_level,
      independence_level: data.independence_level || pet.independence_level,
      environment: data.environment || pet.environment,
      city: data.city || pet.city,
    })

    return { petUpdated }
  }
}
