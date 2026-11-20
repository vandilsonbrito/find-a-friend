import { expect, describe, it, beforeEach, vi } from 'vitest'
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { GetAllOrgsUseCase } from './get-all-orgs'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { randomUUID } from 'node:crypto'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: GetAllOrgsUseCase

describe('Get All Orgs Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new GetAllOrgsUseCase(orgsRepository, petsRepository)
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

    expect(orgs).toEqual([
      { ...createdOrg1, available_pets_count: 0 },
      { ...createdOrg2, available_pets_count: 0 },
    ])
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

  it('should return the number of available pets of each organization', async () => {
    const org1 = await createOrg('org1@example.com')
    const org2 = await createOrg('org2@example.com')

    addPet(org1.id, false)
    addPet(org1.id, false)
    addPet(org1.id, true)

    const { orgs } = await sut.execute()

    expect(orgs).toEqual([
      expect.objectContaining({ id: org1.id, available_pets_count: 2 }),
      expect.objectContaining({ id: org2.id, available_pets_count: 0 }),
    ])
  })

  it('should count the pets of all organizations with a single repository call', async () => {
    const org1 = await createOrg('org1@example.com')
    const org2 = await createOrg('org2@example.com')
    const org3 = await createOrg('org3@example.com')

    const countSpy = vi.spyOn(petsRepository, 'countAvailablePetsByOrgs')

    await sut.execute()

    expect(countSpy).toHaveBeenCalledTimes(1)
    expect(countSpy).toHaveBeenCalledWith([org1.id, org2.id, org3.id])
  })
})

async function createOrg(email: string) {
  return orgsRepository.create({
    name: email,
    email,
    password_hash: await hash('123456', 6),
    whatsapp: '11999999999',
    address: 'Rua Teste',
    city: 'São Paulo',
    description: 'Org description',
    state: 'SP',
    cep: '12345678',
    created_at: new Date(),
  })
}

function addPet(orgId: string, isAdopted: boolean) {
  petsRepository.pets.push({
    id: randomUUID(),
    org_id: orgId,
    name: 'Rex',
    description: null,
    age: 'puppy',
    size: 'medium',
    energy_level: 'low',
    independence_level: 'medium',
    environment: 'medium',
    breed: 'SRD',
    sex: 'male',
    type: 'dog',
    city: 'São Paulo',
    state: 'SP',
    is_adopted: isAdopted,
    created_at: new Date(),
  })
}
