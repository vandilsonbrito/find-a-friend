import { Org, Prisma } from '@prisma/client'
import { IOrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'
import { OrgNotFoundError } from '@/use-cases/errors/org-not-found-error'

export class InMemoryOrgsRepository implements IOrgsRepository {
  public items: Org[] = []
  
  findAll(): Promise<Org[]> {
    const orgs = this.items
    return Promise.resolve(orgs)
  }

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
      description: data.description,
      email: data.email,
      password_hash: data.password_hash,
      whatsapp: data.whatsapp,
      address: data.address,
      city: data.city,
      state: data.state,
      cep: data.cep,
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }

  async edit(data: Prisma.OrgUpdateInput) {
    const org = this.items.find((item) => item.id === data.id)

    if (!org) {
      throw new OrgNotFoundError()
    }

    org.name = (data.name as string) ?? org.name
    org.description = (data.description as string) ?? org.description
    org.whatsapp = (data.whatsapp as string) ?? org.whatsapp
    org.address = (data.address as string) ?? org.address
    org.city = (data.city as string) ?? org.city
    org.state = (data.state as string) ?? org.state
    org.cep = (data.cep as string) ?? org.cep

    return org
  }
}
