import { prisma } from 'lib/prisma'
import { IPetsRepository } from '../pets-repository'
import { Pet, Prisma } from '@prisma/client'

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
}
