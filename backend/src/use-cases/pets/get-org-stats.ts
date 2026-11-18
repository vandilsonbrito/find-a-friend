import { IPetsRepository } from '../../repositories/pets-repository'

interface GetOrgStatsUseCaseRequest {
  orgId: string
}

interface GetOrgStatsUseCaseResponse {
  stats: {
    total: number
    available: number
    adopted: number
  }
}

export class GetOrgStatsUseCase {
  private petsRepository: IPetsRepository
  constructor(petsRepository: IPetsRepository) {
    this.petsRepository = petsRepository
  }

  async execute({
    orgId,
  }: GetOrgStatsUseCaseRequest): Promise<GetOrgStatsUseCaseResponse> {
    const { available, adopted } =
      await this.petsRepository.countPetsByOrgGroupedByStatus(orgId)

    return {
      stats: {
        total: available + adopted,
        available,
        adopted,
      },
    }
  }
}
