import { Org, Prisma } from '@prisma/client'
import { IOrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements IOrgsRepository {
  public items: Org[] = []

  async findEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async findById(orgId: string) {
    const org = this.items.find((item) => item.id === orgId)

    if (!org) {
      return null
    }

    return org
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      whatsapp: data.whatsapp,
      address: data.address,
      city: data.city,
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }
}
