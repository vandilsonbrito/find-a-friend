import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { GetAllOrgsUseCase } from './get-all-orgs'

let orgsRepository: InMemoryOrgsRepository
let sut: GetAllOrgsUseCase

describe('Get All Orgs Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetAllOrgsUseCase(orgsRepository)
  })

  it('should be able to get all Organization profile', async () => {
    const createdOrg1 = await orgsRepository.create({
      name: 'John Doe',
      email: 'Z6m4I@example.com',
      password_hash: await hash('123456', 6),
      whatsapp: '11999999999',
      address: 'Rua Teste',
      city: 'São Paulo',
      description: 'Org description',
      state: 'SP',
      cep: '12345678',
      created_at: new Date(),
    })
    const createdOrg2 = await orgsRepository.create({
      name: 'Org 2',
      email: 'org2@example.com',
      password_hash: await hash('123456', 6),
      whatsapp: '11999999999',
      address: 'Rua Teste',
      city: 'São Paulo',
      description: 'Org description',
      state: 'SP',
      cep: '12345678',
      created_at: new Date(),
    })

    const { orgs } = await sut.execute()

    expect(orgs).toEqual([createdOrg1, createdOrg2])
  })

  it('should return an empty array if there are no organizations', async () => {
    const { orgs } = await sut.execute()
  
    expect(orgs).toEqual([])
  })

  it('should return organizations with correct properties', async () => {
    await orgsRepository.create({
      name: 'Org Teste',
      email: 'testeorg@example.com',
      password_hash: await hash('123456', 6),
      whatsapp: '11999999999',
      address: 'Rua Teste',
      city: 'São Paulo',
      description: 'Descrição',
      state: 'SP',
      cep: '12345678',
      created_at: new Date(),
    })
  
    const { orgs } = await sut.execute()
  
    expect(orgs[0]).toHaveProperty('id')
    expect(orgs[0]).toHaveProperty('name', 'Org Teste')
    expect(orgs[0]).toHaveProperty('email', 'testeorg@example.com')
  })
})
