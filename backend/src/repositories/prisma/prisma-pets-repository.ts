import { prisma } from '../../../lib/prisma'
import { IPetsRepository } from '../pets-repository'
import { Pet, Prisma } from '@prisma/client'
import { GetPetsAvailableForAdoptionUseCaseRequest } from '../../@types/get-pets-available-for-adoption-use-case'

type PetWithPhoto = Pet & {
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
  ): Promise<Pet[]> {
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
  
    const pets = await prisma.pet.findMany({
      where: {
        is_adopted: false,
        ...(city && { city }),
        ...(age && { age }),
        ...(size && { size }),
        ...(energy_level && { energy_level }),
        ...(independence_level && { independence_level }),
        ...(environment && { environment }),
        ...(type && { type }),
        ...(sex && { sex }),
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
    const petPhotosMap = petPhotos.reduce((acc, petPhoto) => {
      if (!acc[petPhoto.pet_id]) {
        acc[petPhoto.pet_id] = []
      }
      acc[petPhoto.pet_id].push(petPhoto.url)
      return acc
    }, {} as Record<string, string[]>)
  
    const petsWithPhotos = pets.map((pet) => {
      return {
        ...pet,
        photos: petPhotosMap[pet.id] || [], 
      }
    })
  
    return petsWithPhotos
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

  async findById(petId: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    })

    return pet
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

    const petPhotosMap = petPhotos.reduce((acc, petPhoto) => {
      if (!acc[petPhoto.pet_id]) {
        acc[petPhoto.pet_id] = []
      }
      acc[petPhoto.pet_id].push(petPhoto.url)
      return acc
    }, {} as Record<string, string[]>)
  
    const petsWithPhotos = pets.map((pet) => {
      return {
        ...pet,
        photos: petPhotosMap[pet.id] || [], 
      }
    })
  
    return petsWithPhotos
  }
}
