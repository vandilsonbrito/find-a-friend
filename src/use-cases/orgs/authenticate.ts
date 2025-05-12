import { IOrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface AuthenticateOrgUseCaseRequest {
  email: string
  password_hash: string
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
    password_hash,
  }: AuthenticateOrgUseCaseRequest): Promise<AuthenticateOrgUseCaseResponse> {
    const org = await this.orgsRepository.findEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const isPasswordCorrect = await compare(password_hash, org.password_hash)

    if (!isPasswordCorrect) {
      throw new InvalidCredentialsError()
    }

    return {
      org,
    }
  }
}
