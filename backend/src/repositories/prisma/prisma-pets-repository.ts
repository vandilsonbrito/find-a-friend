import { prisma } from '../../../lib/prisma'
import { IPetsRepository } from '../pets-repository'
import { Pet, Prisma } from '@prisma/client'
import { GetPetsAvailableForAdoptionUseCaseRequest } from '../../@types/get-pets-available-for-adoption-use-case'

export type PetWithPhoto = Pet & {
  photos: string[]
}
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

  async save(pet: Pet): Promise<Pet> {
    const petUpdated = await prisma.pet.update({
      where: {
        id: pet.id,
      },
      data: pet,
    })

    return petUpdated
  }

  async update(data: Prisma.PetUpdateInput): Promise<Pet> {
    const petUpdated = await prisma.pet.update({
      where: {
        id: data.id as string,
      },
      data,
    })

    return petUpdated
  }

  async delete(petId: string): Promise<void> {
    await prisma.pet.delete({
      where: {
        id: petId,
      },
    })
  }

  async findAvailablePets(
    data: GetPetsAvailableForAdoptionUseCaseRequest,
  ): Promise<{
    pets: Pet[]
    total_pets: number
    current_page: number
    total_pages: number
  }> {
    const {
      city,
      age,
      size,
      energy_level,
      independence_level,
      environment,
      type,
      sex,
      page,
    } = data

    const where = {
      is_adopted: false,
      ...(city && { city }),
      ...(age && { age }),
      ...(size && { size }),
      ...(energy_level && { energy_level }),
      ...(independence_level && { independence_level }),
      ...(environment && { environment }),
      ...(type && { type }),
      ...(sex && { sex }),
    }

    const [pets, total] = await Promise.all([
      prisma.pet.findMany({
        where,
        take: 20,
        skip: (page - 1) * 20,
      }),

      prisma.pet.count({
        where,
      }),
    ])

    const petPhotos = await prisma.petPhoto.findMany({
      where: {
        pet_id: {
          in: pets.map((pet) => pet.id),
        },
      },
    })

    const petPhotosMap = petPhotos.reduce(
      (acc, petPhoto) => {
        if (!acc[petPhoto.pet_id]) {
          acc[petPhoto.pet_id] = []
        }
        acc[petPhoto.pet_id].push(petPhoto.url)
        return acc
      },
      {} as Record<string, string[]>,
    )

    const petsWithPhotos = pets.map((pet) => {
      return {
        ...pet,
        photos: petPhotosMap[pet.id] || [],
      }
    })

    return {
      pets: petsWithPhotos,
      total_pets: total,
      current_page: page,
      total_pages: Math.ceil(total / 20),
    }
  }

  async countAvailablePetsByOrg(orgId: string) {
    const count = await prisma.pet.count({
      where: {
        org_id: orgId,
        is_adopted: false,
      },
    })

    return count
  }

  async findById(petId: string): Promise<PetWithPhoto | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    })

    const petPhotos = await prisma.petPhoto.findMany({
      where: {
        pet_id: petId,
      },
    })

    return {
      ...pet,
      photos: petPhotos.map((photo) => photo.url) || [],
    } as PetWithPhoto
  }

  async findManyByOrgId(orgId: string, page: number): Promise<PetWithPhoto[]> {
    const pets = await prisma.pet.findMany({
      where: {
        org_id: orgId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    const petPhotos = await prisma.petPhoto.findMany({
      where: {
        pet_id: {
          in: pets.map((pet) => pet.id),
        },
      },
    })

    const petPhotosMap = petPhotos.reduce(
      (acc, petPhoto) => {
        if (!acc[petPhoto.pet_id]) {
          acc[petPhoto.pet_id] = []
        }
        acc[petPhoto.pet_id].push(petPhoto.url)
        return acc
      },
      {} as Record<string, string[]>,
    )

    const petsWithPhotos = pets.map((pet) => {
      return {
        ...pet,
        photos: petPhotosMap[pet.id] || [],
      }
    })

    return petsWithPhotos
  }
}
