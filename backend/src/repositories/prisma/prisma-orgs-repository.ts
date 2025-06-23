import { prisma } from '../../../lib/prisma'
import { IOrgsRepository } from '../orgs-repository'
import { Prisma } from '@prisma/client'

export class PrismaOrgsRepository implements IOrgsRepository {
  async findAll() {
    const orgs = await prisma.org.findMany()

    return orgs
  }
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

  async edit(data: Prisma.OrgUpdateInput) {
    const org = await prisma.org.update({
      where: { id: data.id as string },
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
