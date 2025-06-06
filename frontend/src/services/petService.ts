import axiosInstance from '../axios'
import type { PetType } from '../components/dashboard/AddPetDialog'
import { translateToEN } from '../utils/translateTypes'
import type {
  Age,
  AgePT,
  EnergyLevel,
  EnergyLevelPT,
  Environment,
  EnvironmentPT,
  IndependenceLevel,
  IndependenceLevelPT,
  Sex,
  SexPT,
  Size,
  SizePT,
  Type,
  TypePT,
} from '../@types'

export interface NewPet {
  name: string
  description: string
  age: string
  size: string
  sex: string
  energy_level: string
  independence_level: string
  environment: string
  type: string
  breed: string
  city: string
  state: string
  photos: string[]
  is_adopted: boolean
}

export const petService = {
  async getOrgPets(orgId: string) {
    const response = await axiosInstance.get(`/orgs/${orgId}/pets`)
    return response.data
  },

  async addPet(newPet: NewPet, orgId: string) {
    const formData = new FormData()

    formData.append('name', newPet.name)
    formData.append('description', newPet.description)
    formData.append('age', translateToEN('age', newPet.age as AgePT) as Age)
    formData.append(
      'size',
      translateToEN('size', newPet.size as SizePT) as Size,
    )
    formData.append('sex', translateToEN('sex', newPet.sex as SexPT) as Sex)
    formData.append(
      'energy_level',
      translateToEN(
        'energy_level',
        newPet.energy_level as EnergyLevelPT,
      ) as EnergyLevel,
    )
    formData.append(
      'independence_level',
      translateToEN(
        'independence_level',
        newPet.independence_level as IndependenceLevelPT,
      ) as IndependenceLevel,
    )
    formData.append(
      'environment',
      translateToEN(
        'environment',
        newPet.environment as EnvironmentPT,
      ) as Environment,
    )
    formData.append(
      'type',
      translateToEN('type', newPet.type as TypePT) as Type,
    )
    formData.append('breed', newPet.breed)
    formData.append('city', newPet.city)
    formData.append('state', newPet.state)
    formData.append('is_adopted', String(newPet.is_adopted))
    formData.append('org_id', orgId)

    if (newPet.photos.length > 0) {
      for (let i = 0; i < newPet.photos.length; i++) {
        const photo = newPet.photos[i]
        if (typeof photo === 'string' && photo.startsWith('data:')) {
          const blob = await fetch(photo).then((res) => res.blob())
          const file = new File([blob], `pet-${newPet.name}-photo-${i}.jpg`, {
            type: blob.type,
          })
          formData.append('photos', file)
        } else if ((photo as unknown) instanceof File) {
          formData.append('photos', photo)
        }
      }
    }

    const response = await axiosInstance.post('/pets', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    return response
  },

  async editPet(petId: string, changes: Partial<PetType>) {
    const response = await axiosInstance.patch(`/pets/${petId}`, changes)
    return response
  },

  async deletePet(petId: string) {
    const response = await axiosInstance.delete(`/pets/${petId}`)
    return response
  },
}
