import {
  Age,
  Environment,
  EnergyLevel,
  IndependenceLevel,
  Size,
} from '@prisma/client'
import { IPetsRepository } from '@/repositories/pets-repository'
import { IPetPhotosRepository } from '@/repositories/pet-photos-repository'
import { IStorageProviderRepository } from '@/repositories/storage-provider-repository'

interface CreatePetUseCaseRequest {
  name: string
  description: string
  age: Age
  size: Size
  energy_level: EnergyLevel
  independence_level: IndependenceLevel
  environment: Environment
  city: string
  org_id: string
  photos: { buffer: Buffer; filename: string }[]
}

export class CreatePetUseCase {
  private petsRepository: IPetsRepository
  private petPhotosRepository: IPetPhotosRepository
  private storageService: IStorageProviderRepository

  constructor(
    petsRepository: IPetsRepository,
    petPhotosRepository: IPetPhotosRepository,
    storageService: IStorageProviderRepository,
  ) {
    this.petsRepository = petsRepository
    this.petPhotosRepository = petPhotosRepository
    this.storageService = storageService
  }

  async execute(data: CreatePetUseCaseRequest) {
    const { photos, ...petData } = data

    const pet = await this.petsRepository.create({
      ...petData,
      org: { connect: { id: petData.org_id } },
    })

    for (const photo of photos) {
      const url = await this.storageService.uploadFile(
        photo.buffer,
        photo.filename,
      )
      await this.petPhotosRepository.create({
        pet_id: pet.id,
        url,
      })
    }

    return { pet }
  }
}
