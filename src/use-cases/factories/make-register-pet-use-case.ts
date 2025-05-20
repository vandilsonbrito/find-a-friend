import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../pets/create'
import { CloudinaryStorageService } from '@/services/cloudinary-storage'
import { PrismaPetPhotosRepository } from '@/repositories/prisma/prisma-pet-photos-repository'

export function makeRegisterPetUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const petPhotosRepository = new PrismaPetPhotosRepository()
  const storageService = new CloudinaryStorageService()

  const createPetUseCase = new CreatePetUseCase(
    petsRepository,
    petPhotosRepository,
    storageService,
  )

  return createPetUseCase
}
