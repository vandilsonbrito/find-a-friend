import {
  Age,
  EnergyLevel,
  Environment,
  Pet,
  Prisma,
  Sex,
  Size,
  Type,
} from '@prisma/client'
import { IPetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { GetPetsAvailableForAdoptionUseCaseRequest } from '../../@types/get-pets-available-for-adoption-use-case'
import { normalizeCityName } from '../../utils/normalizeCityName'
import { PetsNotFoundError } from '../../use-cases/errors/pet-not-found-error'

export class InMemoryPetsRepository implements IPetsRepository {
  public pets: Pet[] = []

  async delete(petId: string) {
    const pet = this.pets.find((pet) => pet.id === petId)

    if (!pet) {
      throw new PetsNotFoundError()
    }
    this.pets = this.pets.filter((pet) => pet.id !== petId)
  }

  async save(pet: Pet) {
    const petIndex = this.pets.findIndex((p) => p.id === pet.id)

    if (petIndex >= 0) {
      this.pets[petIndex] = pet
    }

    return pet
  }

  async update(data: Prisma.PetUpdateInput) {
    const pet = this.pets.find((pet) => pet.id === data.id)

    if (!pet) {
      throw new PetsNotFoundError()
    }

    pet.name = (data.name as string) ?? pet.name
    pet.description = (data.description as string) ?? pet.description
    pet.city = (data.city as string) ?? pet.city
    pet.age = (data.age as Age) ?? pet.age
    pet.size = (data.size as Size) ?? pet.size
    pet.energy_level = (data.energy_level as EnergyLevel) ?? pet.energy_level
    pet.independence_level =
      (data.independence_level as EnergyLevel) ?? pet.independence_level
    pet.environment = (data.environment as Environment) ?? pet.environment
    pet.sex = (data.sex as Sex) ?? pet.sex
    pet.breed = (data.breed as string) ?? pet.breed
    pet.type = (data.type as Type) ?? pet.type

    return pet
  }

  async findById(petId: string) {
    const pet = this.pets.find((pet) => pet.id === petId)

    if (!pet) {
      return null
    }

    return pet
  }

  async create(data: Prisma.PetCreateInput) {
    const pet = {
      id: randomUUID(),
      description: data.description ?? null,
      is_adopted: false,
      org_id: randomUUID(),
      ...data,
      created_at: new Date(),
    }

    this.pets.push(pet)

    return pet
  }

  async findManyByCityAndFilters(
    data: GetPetsAvailableForAdoptionUseCaseRequest,
  ): Promise<Pet[]> {
    return this.pets.filter((pet) => {
      if (normalizeCityName(pet.city) !== normalizeCityName(data.city))
        return false
      if (pet.is_adopted) return false
      if (data.age && pet.age !== data.age) return false
      if (data.size && pet.size !== data.size) return false
      if (data.energy_level && pet.energy_level !== data.energy_level)
        return false
      if (
        data.independence_level &&
        pet.independence_level !== data.independence_level
      )
        return false
      if (data.environment && pet.environment !== data.environment) return false
      if(data.type && pet.type !== data.type) return false
      if(data.sex && pet.sex !== data.sex) return false
      return true

    })
  }
}
