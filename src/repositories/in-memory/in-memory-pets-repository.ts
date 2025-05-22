import { Pet, Prisma } from '@prisma/client'
import { IPetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'
import { GetPetsAvailableForAdoptionUseCaseRequest } from '@/@types/get-pets-available-for-adoption-use-case'
import { normalizeCityName } from '@/utils/normalizeCityName'

export class InMemoryPetsRepository implements IPetsRepository {
  public pets: Pet[] = []

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
      return true
    })
  }
}
