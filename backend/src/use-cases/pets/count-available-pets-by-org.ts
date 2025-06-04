import { IPetsRepository } from "@/repositories/pets-repository"

export class CountAvailablePetsByOrgUseCase {
    constructor(private petsRepository: IPetsRepository) {}
  
    async execute(orgId: string) {
      const count = await this.petsRepository.countAvailablePetsByOrg(orgId)
      return { count }
    }
  }