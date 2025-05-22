import { prisma } from 'lib/prisma'
import { IPetsRepository } from '../pets-repository'
import { Pet, Prisma } from '@prisma/client'
import { GetPetsAvailableForAdoptionUseCaseRequest } from '@/@types/get-pets-available-for-adoption-use-case'

export class PrismaPetsRepository implements IPetsRepository {
  async create(data: Prisma.PetCreateInput & { org_id: string }): Promise<Pet> {
    const { org_id, ...rest } = data

    const pet = await prisma.pet.create({
      data: {
        ...rest,
        org: {
          connect: {
            id: org_id,
          },
        },
      },
    })

    return pet
  }

  async findManyByCityAndFilters(
    data: GetPetsAvailableForAdoptionUseCaseRequest,
  ): Promise<Pet[]> {
    const {
      city,
      age,
      size,
      energy_level,
      independence_level,
      environment,
      page,
    } = data
    const pets = await prisma.pet.findMany({
      where: {
        city,
        is_adopted: false,
        ...(age && { age }),
        ...(size && { size }),
        ...(energy_level && { energy_level }),
        ...(independence_level && { independence_level }),
        ...(environment && { environment }),
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async findById(petId: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    })

    return pet
  }
}
