import { IOrgsRepository } from '../../repositories/orgs-repository'
import { IPetsRepository } from '../../repositories/pets-repository'
import { Org } from '@prisma/client'

export type OrgWithAvailablePetsCount = Org & {
  available_pets_count: number
}

interface GetAllOrgsResponse {
  orgs: OrgWithAvailablePetsCount[]
}

export class GetAllOrgsUseCase {
  private orgsRepository: IOrgsRepository
  private petsRepository: IPetsRepository

  constructor(
    orgsRepository: IOrgsRepository,
    petsRepository: IPetsRepository,
  ) {
    this.orgsRepository = orgsRepository
    this.petsRepository = petsRepository
  }

  async execute(): Promise<GetAllOrgsResponse> {
    const orgs = await this.orgsRepository.findAll()

    // One grouped count for every org instead of one count query per org (N+1).
    const availablePetsByOrg =
      await this.petsRepository.countAvailablePetsByOrgs(
        orgs.map((org) => org.id),
      )

    return {
      orgs: orgs.map((org) => ({
        ...org,
        available_pets_count: availablePetsByOrg[org.id] ?? 0,
      })),
    }
  }
}
