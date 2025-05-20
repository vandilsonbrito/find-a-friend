import { Pet, Prisma } from '@prisma/client'
import { IPetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements IPetsRepository {
  public pets: Pet[] = []

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
}
