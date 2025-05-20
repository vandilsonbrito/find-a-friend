import { Prisma } from '@prisma/client'
import { IPetPhotosRepository } from '../pet-photos-repository'
import { prisma } from 'lib/prisma'

export class PrismaPetPhotosRepository implements IPetPhotosRepository {
  async create(data: Prisma.PetPhotoUncheckedCreateInput) {
    const petPhoto = await prisma.petPhoto.create({
      data,
    })

    return petPhoto
  }
}
