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

interface PetWithPhotos extends Pet {
  photos: string[]
}

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
    pet.is_adopted = (data.is_adopted as boolean) ?? pet.is_adopted

    return pet
  }

  async findById(petId: string): Promise<PetWithPhotos | null> {
    const pet = this.pets.find((pet) => pet.id === petId)

    if (!pet) {
      return null
    }

    const petWithPhotos: PetWithPhotos = {
      ...pet,
      photos: [],
    }

    return petWithPhotos
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

  async findAvailablePets(
    data: GetPetsAvailableForAdoptionUseCaseRequest,
  ): Promise<{
    pets: Pet[]
    total_pets: number
    current_page: number
    total_pages: number
  }> {
    const filteredPets = this.pets.filter((pet) => {
      if (
        data.city &&
        normalizeCityName(pet.city) !== normalizeCityName(data.city)
      )
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
      if (data.type && pet.type !== data.type) return false
      if (data.sex && pet.sex !== data.sex) return false
      return true
    })

    const totalPets = filteredPets.length
    const currentPage = 1
    const totalPages = Math.ceil(totalPets / 20)

    return {
      pets: filteredPets,
      total_pets: totalPets,
      current_page: currentPage,
      total_pages: totalPages,
    }
  }

  async countAvailablePetsByOrg(orgId: string) {
    return this.pets.filter((pet) => pet.org_id === orgId && !pet.is_adopted)
      .length
  }

  async findManyByOrgId(orgId: string, page: number): Promise<Pet[]> {
    return this.pets.filter((pet) => pet.org_id === orgId)
  }
}
