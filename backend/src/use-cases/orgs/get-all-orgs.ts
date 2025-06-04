import { IOrgsRepository } from '../../repositories/orgs-repository'
import { OrgNotFoundError } from '../../use-cases/errors/org-not-found-error'
import { Org } from '@prisma/client'

interface GetAllOrgsResponse {
  orgs: Org[]
}

export class GetAllOrgsUseCase {
  private orgsRepository: IOrgsRepository

  constructor(orgsRepository: IOrgsRepository) {
    this.orgsRepository = orgsRepository
  }

  async execute(): Promise<GetAllOrgsResponse> {
    const orgs = await this.orgsRepository.findAll()

    return { orgs }
  }
}
