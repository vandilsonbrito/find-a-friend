import { PetPhoto, Prisma } from '@prisma/client'
import { IPetPhotosRepository } from '../pet-photos-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetPhotosRepository implements IPetPhotosRepository {
  public items: PetPhoto[] = []

  async createMany(data: Prisma.PetPhotoCreateManyInput[]) {
    for (const photo of data) {
      this.items.push({
        id: randomUUID(),
        pet_id: photo.pet_id,
        url: photo.url,
      })
    }
  }
}
