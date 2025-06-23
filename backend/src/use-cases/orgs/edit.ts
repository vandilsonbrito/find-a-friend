import { Org } from '@prisma/client'
import { IOrgsRepository } from '../../repositories/orgs-repository'
import { normalizeCityName } from 'src/utils/normalizeCityName'
import { UUID } from 'node:crypto'

interface EditOrgUseCaseRequest {
  id: UUID
  name?: string
  description?: string
  whatsapp?: string
  address?: string
  city?: string
  state?: string
  cep?: string
}

interface EditOrgUseCaseResponse {
  org: Org
}

export class EditOrgUseCase {
  private orgsRepository: IOrgsRepository

  constructor(orgsRepository: IOrgsRepository) {
    this.orgsRepository = orgsRepository
  }

  async execute({
    id,
    name,
    description,
    whatsapp,
    address,
    city,
    state,
    cep,
  }: EditOrgUseCaseRequest): Promise<EditOrgUseCaseResponse> {
    const org = await this.orgsRepository.edit({
      id,
      name,
      whatsapp,
      address,
      city: city ? normalizeCityName(city) : city,
      description,
      state,
      cep,
    })

    return {
      org,
    }
  }
}
