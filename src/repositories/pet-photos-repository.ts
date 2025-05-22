import { PetPhoto, Prisma } from '@prisma/client'

export interface IPetPhotosRepository {
  create(data: Prisma.PetPhotoUncheckedCreateInput): Promise<PetPhoto>
}
