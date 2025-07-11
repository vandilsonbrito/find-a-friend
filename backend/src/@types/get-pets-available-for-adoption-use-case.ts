import {
  Age,
  EnergyLevel,
  Environment,
  IndependenceLevel,
  Sex,
  Size,
  Type,
} from '@prisma/client'

export interface GetPetsAvailableForAdoptionUseCaseRequest {
  page: number
  city?: string
  age?: Age
  size?: Size
  energy_level?: EnergyLevel
  independence_level?: IndependenceLevel
  environment?: Environment
  sex?: Sex
  type?: Type
}
