import { IOrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialError } from '../errors/invalid-credential-error'

interface AuthenticateOrgUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrgUseCaseResponse {
  org: Org
}

export class AuthenticateOrgUseCase {
  private orgsRepository: IOrgsRepository
  constructor(orgsRepository: IOrgsRepository) {
    this.orgsRepository = orgsRepository
  }

  async execute({
    email,
    password,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findEmail(email)

    if (!org) {
      throw new InvalidCredentialError()
    }

    const isPasswordCorrect = await compare(password, org.password_hash)

    if (!isPasswordCorrect) {
      throw new InvalidCredentialError()
    }

    return {
      org,
    }
  }
}
