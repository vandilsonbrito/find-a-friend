import { Prisma } from '@prisma/client'
import { IPetPhotosRepository } from '../pet-photos-repository'
import { prisma } from '../../../lib/prisma'

export class PrismaPetPhotosRepository implements IPetPhotosRepository {
  async createMany(data: Prisma.PetPhotoCreateManyInput[]) {
    await prisma.petPhoto.createMany({ data })
  }
}
