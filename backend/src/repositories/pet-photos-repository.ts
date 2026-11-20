import { Prisma } from '@prisma/client'

export interface IPetPhotosRepository {
  createMany(data: Prisma.PetPhotoCreateManyInput[]): Promise<void>
}
