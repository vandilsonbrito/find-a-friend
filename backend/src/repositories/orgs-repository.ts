import { Org, Prisma } from '@prisma/client'

export interface IOrgsRepository {
  findAll(): Promise<Org[]>
  edit(data: Prisma.OrgUpdateInput): Promise<Org>
  findEmail(email: string): Promise<Org | null>
  create(data: Prisma.OrgCreateInput): Promise<Org>
  findById(orgId: string): Promise<Org | null>
}
