import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { CreatePetUseCase } from '../pets/create'
import { CloudinaryStorageService } from '@/services/cloudinary-storage'
import { PrismaPetPhotosRepository } from '@/repositories/prisma/prisma-pet-photos-repository'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeRegisterPetUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const petsRepository = new PrismaPetsRepository()
  const petPhotosRepository = new PrismaPetPhotosRepository()
  const storageService = new CloudinaryStorageService()

  const createPetUseCase = new CreatePetUseCase(
    orgsRepository,
    petsRepository,
    petPhotosRepository,
    storageService,
  )

  return createPetUseCase
}
