import { prisma } from 'lib/prisma'
import { IOrgsRepository } from '../orgs-repository'
import { Prisma } from '@prisma/client'

export class PrismaOrgsRepository implements IOrgsRepository {
  async findEmail(email: string) {
    const org = await prisma.org.findUnique({
      where: { email },
    })

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async findById(orgId: string) {
    const org = await prisma.org.findUnique({
      where: { id: orgId },
    })

    return org
  }
}
