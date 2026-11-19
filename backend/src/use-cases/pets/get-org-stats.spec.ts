import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetPhotosRepository } from '../../repositories/in-memory/in-memory-pet-photos-repository'
import { CreatePetUseCase } from './create'
import { hash } from 'bcryptjs'
import { FakeStorageProvider } from '../../services/fake-storage-service'
import { GetOrgStatsUseCase } from './get-org-stats'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let createPetUseCase: CreatePetUseCase
let sut: GetOrgStatsUseCase

describe('Get Org Stats Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    createPetUseCase = new CreatePetUseCase(
      orgsRepository,
      petsRepository,
      new InMemoryPetPhotosRepository(),
      new FakeStorageProvider(),
    )
    sut = new GetOrgStatsUseCase(petsRepository)
  })

  async function createOrg(email: string) {
    return orgsRepository.create({
      name: 'Org',
      email,
      password_hash: await hash('123456', 6),
      whatsapp: '11999999999',
      address: 'Rua Teste',
      city: 'São Paulo',
      description: 'Org description',
      state: 'SP',
      cep: '12345678',
    })
  }

  async function createPet(orgId: string, { isAdopted = false } = {}) {
    const { pet } = await createPetUseCase.execute({
      name: 'Totó',
      description: 'friendly pet',
      age: 'adult',
      size: 'medium',
      energy_level: 'medium',
      independence_level: 'medium',
      environment: 'medium',
      breed: 'Mixed',
      sex: 'male',
      type: 'dog',
      org_id: orgId,
      city: 'São Paulo',
      state: 'SP',
      photos: [{ buffer: Buffer.from('photo') }],
    })

    if (isAdopted) {
      const stored = petsRepository.pets.find((item) => item.id === pet.id)
      if (stored) stored.is_adopted = true
    }

    return pet
  }

  it('should return zeros for an org with no pets', async () => {
    const org = await createOrg('org1@example.com')

    const { stats } = await sut.execute({ orgId: org.id })

    expect(stats).toEqual({ total: 0, available: 0, adopted: 0 })
  })

  it('should count available and adopted pets of the org', async () => {
    const org = await createOrg('org1@example.com')

    await createPet(org.id)
    await createPet(org.id)
    await createPet(org.id)
    await createPet(org.id, { isAdopted: true })
    await createPet(org.id, { isAdopted: true })

    const { stats } = await sut.execute({ orgId: org.id })

    expect(stats).toEqual({ total: 5, available: 3, adopted: 2 })
  })

  it('should not count pets from another org', async () => {
    const org1 = await createOrg('org1@example.com')
    const org2 = await createOrg('org2@example.com')

    await createPet(org1.id)
    await createPet(org1.id, { isAdopted: true })
    await createPet(org2.id)

    const { stats } = await sut.execute({ orgId: org2.id })

    expect(stats).toEqual({ total: 1, available: 1, adopted: 0 })
  })
})
