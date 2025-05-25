import { hash } from 'bcryptjs'
import { Org } from '@prisma/client'
import { IOrgsRepository } from '../../repositories/orgs-repository'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'
import { normalizeCityName } from 'src/utils/normalizeCityName'

interface RegisterOrgUseCaseRequest {
  name: string
  description: string
  email: string
  password: string
  whatsapp: string
  address: string
  city: string
  state: string
  cep: string 
}

interface RegisterOrgUseCaseResponse {
  org: Org
}

export class RegisterOrgUseCase {
  private orgsRepository: IOrgsRepository

  constructor(orgsRepository: IOrgsRepository) {
    this.orgsRepository = orgsRepository
  }

  async execute({
    name,
    email,
    description,
    password,
    whatsapp,
    address,
    city,
    state,
    cep
  }: RegisterOrgUseCaseRequest): Promise<RegisterOrgUseCaseResponse> {
    const orgWithTheSameEmail = await this.orgsRepository.findEmail(email)

    if (orgWithTheSameEmail) {
      throw new OrgAlreadyExistsError()
    }

    const password_hash = await hash(password, 6)

    const org = await this.orgsRepository.create({
      name,
      email,
      password_hash,
      whatsapp,
      address,
      city: normalizeCityName(city),
      description,
      state,
      cep,
    })

    return {
      org,
    }
  }
}
