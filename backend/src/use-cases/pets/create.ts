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
import { CreatePetPhotosError } from '../errors/create-pet-photos-error'

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

const MIN_PHOTOS = 1
const MAX_PHOTOS = 5

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

      if (photos.length < MIN_PHOTOS || photos.length > MAX_PHOTOS) {
        throw new CreatePetPhotosError()
      }

      // Se o Cloudinary falhar nenhum pet é criado sem foto.
      // Promisse.all garante que se uma das fotos falhar, nenhum pet é criado (é jogado pro catch).
      const urls = await Promise.all(
        photos.map((photo) =>
          this.storageService.uploadFile(photo.buffer, photo.filename),
        ),
      )

      const pet = await this.petsRepository.create({
        city: normalizeCityName(city),
        ...petData,
        org: { connect: { id: petData.org_id } },
      })

      await Promise.all(
        urls.map((url) =>
          this.petPhotosRepository.create({
            pet_id: pet.id,
            url,
          }),
        ),
      )

      const petWithPhotos = await this.petsRepository.findById(pet.id)

      if (!petWithPhotos) {
        throw new CreatePetError()
      }

      return { pet: petWithPhotos }
    } catch (error) {
      if (
        error instanceof OrgNotFoundError ||
        error instanceof CreatePetPhotosError
      ) {
        throw error
      }

      console.error('[CreatePetUseCase] Unexpected error:', error)
      throw new CreatePetError()
    }
  }
}
