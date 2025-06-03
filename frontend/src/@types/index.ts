export interface OrgFromAPI {
  id: string
  name: string
  description: string
  email: string
  whatsapp: string
  address: string
  city: string
  state: string
  cep: string
  createdAt: string
}

export type AllOrgsFromAPI = OrgFromAPI & {
  pets_count: number
}

export interface PetToAPI {
  name: string
  description: string
  age: Age
  size: Size
  sex: Sex
  energy_level: EnergyLevel
  independence_level: IndependenceLevel
  environment: Environment
  type: Type
  breed: string
  city: string
  is_adopted: boolean
  photos: string[]
  org_id: string
}
export interface PetFromAPI {
  id: string
  name: string
  description: string
  age: Age
  size: Size
  sex: Sex
  energy_level: EnergyLevel
  independence_level: IndependenceLevel
  environment: Environment
  type: Type
  breed: string
  city: string
  state: string
  photos: string[]
  is_adopted: boolean
  created_at: string
}

export type Age = 'puppy' | 'adult' | 'senior'
export type Size = 'small' | 'medium' | 'large'
export type EnergyLevel = 'low' | 'medium' | 'high'
export type IndependenceLevel = 'low' | 'medium' | 'high'
export type Environment = 'small' | 'medium' | 'large'
export type Sex = 'male' | 'female'
export type Type = 'dog' | 'cat'

export interface PetCardType {
  id: string
  name: string
  description: string
  age: AgePT
  size: SizePT
  sex: SexPT
  energy_level: EnergyLevelPT
  independence_level: IndependenceLevelPT
  environment: EnvironmentPT
  type: TypePT
  breed: string
  city: string
  is_adopted: boolean
  photos: string[]
  createdAt: string
}
export type TypePT = 'Cachorro' | 'Gato'
export type AgePT = 'Filhote' | 'Adulto' | 'Idoso'
export type SizePT = 'Pequeno' | 'Médio' | 'Grande'
export type SexPT = 'Macho' | 'Fêmea'
export type EnergyLevelPT = 'Baixo' | 'Médio' | 'Alto'
export type IndependenceLevelPT = 'Baixo' | 'Médio' | 'Alto'
export type EnvironmentPT = 'Pequeno' | 'Médio' | 'Amplo'
