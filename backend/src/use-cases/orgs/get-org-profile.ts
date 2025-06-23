import { IOrgsRepository } from '../../repositories/orgs-repository'
import { OrgNotFoundError } from '../../use-cases/errors/org-not-found-error'
import { Org } from '@prisma/client'

interface GetOrgProfileRequest {
  orgId: string
}

interface GetOrgProfileResponse {
  org: Org
}

export class GetOrgProfileUseCase {
  private orgsRepository: IOrgsRepository

  constructor(orgsRepository: IOrgsRepository) {
    this.orgsRepository = orgsRepository
  }

  async execute({
    orgId,
  }: GetOrgProfileRequest): Promise<GetOrgProfileResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new OrgNotFoundError()
    }
    return { org: org as Org }
  }
}
