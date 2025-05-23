import { PetPhoto, Prisma } from '@prisma/client'
import { IPetPhotosRepository } from '../pet-photos-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetPhotosRepository implements IPetPhotosRepository {
  public items: PetPhoto[] = []

  async create(data: Prisma.PetPhotoUncheckedCreateInput) {
    const petPhotoData = {
      id: randomUUID(),
      pet_id: data.pet_id,
      url: data.url,
    }

    this.items.push(petPhotoData)

    return petPhotoData
  }
}
