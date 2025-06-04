import { IPetsRepository } from '../../repositories/pets-repository'
import {
  Age,
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Pet,
  Sex,
  Size,
  Type,
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
  sex?: Sex
  breed?: string
  type?: Type
  city?: string
  state?: string
  is_adopted?: boolean
  photos?: string[]
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
      sex: data.sex || pet.sex,
      type: data.type || pet.type,
      breed: data.breed || pet.breed,
      city: data.city || pet.city,
      state: data.state || pet.state,
      is_adopted: data.is_adopted || pet.is_adopted,
    })

    return { petUpdated }
  }
}
