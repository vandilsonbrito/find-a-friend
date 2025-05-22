import { IPetsRepository } from '@/repositories/pets-repository'
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
  pet: Pet
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

    pet.name = data.name || pet.name
    pet.description = data.description || pet.description
    pet.age = data.age || pet.age
    pet.size = data.size || pet.size
    pet.energy_level = data.energy_level || pet.energy_level
    pet.independence_level = data.independence_level || pet.independence_level
    pet.environment = data.environment || pet.environment
    pet.city = data.city || pet.city

    await this.petsRepository.save(pet)

    return { pet }
  }
}
