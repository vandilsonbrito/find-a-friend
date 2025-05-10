import { hash } from 'bcryptjs'
import { Org } from '@prisma/client'
import { IOrgsRepository } from '@/repositories/orgs-repository'
import { OrgAlreadyExistsError } from '../errors/org-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  whatsapp: string
  address: string
  city: string
}

interface RegisterUseCaseResponse {
  org: Org
}

export class RegisterUseCase {
  private orgsRepository: IOrgsRepository

  constructor(orgsRepository: IOrgsRepository) {
    this.orgsRepository = orgsRepository
  }

  async execute({
    name,
    email,
    password,
    whatsapp,
    address,
    city,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
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
      city,
    })

    return {
      org,
    }
  }
}
