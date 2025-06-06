import { IOrgsRepository } from '../../repositories/orgs-repository'
import { OrgNotFoundError } from '../../use-cases/errors/org-not-found-error'
import { Org } from '@prisma/client'

interface GetOrgRequest {
  orgId: string
}

interface GetOrgResponse {
  org: Org
}

export class GetOrgUseCase {
  private orgsRepository: IOrgsRepository

  constructor(orgsRepository: IOrgsRepository) {
    this.orgsRepository = orgsRepository
  }

  async execute({ orgId }: GetOrgRequest): Promise<GetOrgResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new OrgNotFoundError()
    }
    return { org: org as Org }
  }
}
