import { PrismaOrgsRepository } from '../../repositories/prisma/prisma-orgs-repository'
import { EditOrgUseCase } from '../orgs/edit'

export function makeEditOrgUseCase() {
    const orgsRepository = new PrismaOrgsRepository()

    const editOrgUseCase = new EditOrgUseCase(
        orgsRepository,
    )

    return editOrgUseCase
}
