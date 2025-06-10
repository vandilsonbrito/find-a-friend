import {
  Age,
  Environment,
  EnergyLevel,
  IndependenceLevel,
  Size,
  Sex,
  Type,
} from '@prisma/client'
import { IPetsRepository } from '../../repositories/pets-repository'
import { IPetPhotosRepository } from '../../repositories/pet-photos-repository'
import { IStorageProviderRepository } from '../../repositories/storage-provider-repository'
import { CreatePetError } from '../errors/create-pet-error'
import { OrgNotFoundError } from '../errors/org-not-found-error'
import { IOrgsRepository } from '../../repositories/orgs-repository'
import { normalizeCityName } from '../../utils/normalizeCityName'

interface CreatePetUseCaseRequest {
  id?: string
  name: string
  description: string
  age: Age
  size: Size
  energy_level: EnergyLevel
  independence_level: IndependenceLevel
  environment: Environment
  sex: Sex
  breed: string
  type: Type
  city: string
  state: string
  org_id: string
  photos: { buffer: Buffer; filename: string }[]
}

export class CreatePetUseCase {
  constructor(
    private orgsRepository: IOrgsRepository,
    private petsRepository: IPetsRepository,
    private petPhotosRepository: IPetPhotosRepository,
    private storageService: IStorageProviderRepository,
  ) {}

  async execute(data: CreatePetUseCaseRequest) {
    try {
      const org = await this.orgsRepository.findById(data.org_id)

      if (!org) {
        throw new OrgNotFoundError()
      }

      const { city, photos, ...petData } = data

      const pet = await this.petsRepository.create({
        city: normalizeCityName(city),
        ...petData,
        org: { connect: { id: petData.org_id } },
      })

      await Promise.all(
        photos.map(async (photo) => {
          const url = await this.storageService.uploadFile(
            photo.buffer,
            photo.filename,
          )
          await this.petPhotosRepository.create({
            pet_id: pet.id,
            url,
          })
        }),
      )

      const petWithPhotos = await this.petsRepository.findById(pet.id)

      if (!petWithPhotos) {
        throw new CreatePetError()
      }

      return { pet: petWithPhotos }
    } catch (error) {
      console.error('[CreatePetUseCase] Unexpected error:', error)
      if (error instanceof OrgNotFoundError) {
        throw error
      }
      throw new CreatePetError()
    }
  }
}
