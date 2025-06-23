import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { InMemoryPetPhotosRepository } from '../../repositories/in-memory/in-memory-pet-photos-repository'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository'
import { IStorageProviderRepository } from '../../repositories/storage-provider-repository'
import { FakeStorageProvider } from '../../tests/mocks/fake-storage-service'
import { randomUUID } from 'node:crypto'
import { GetOrgPetsUseCase } from './get-org-pets'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let petPhotosRepository: InMemoryPetPhotosRepository
let storageProvider: IStorageProviderRepository
let createPetUseCase: CreatePetUseCase
let sut: GetOrgPetsUseCase

describe('Get Org Pets Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    petPhotosRepository = new InMemoryPetPhotosRepository()
    storageProvider = new FakeStorageProvider()
    createPetUseCase = new CreatePetUseCase(
      orgsRepository,
      petsRepository,
      petPhotosRepository,
      storageProvider,
    )
    sut = new GetOrgPetsUseCase(petsRepository)
  })

  async function createOrg() {
    return await orgsRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
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

  async function createPet(orgId: string, name: string) {
    const { pet } = await createPetUseCase.execute({
      id: randomUUID(),
      name,
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
      photos: [
        { buffer: Buffer.from(`${name}-photo.png`), filename: `${name}-photo.png` },
      ],
    })
    return pet
  }

  it('should be able to get all pets from an org by org id', async () => {
    const org = await createOrg()

    const createdPet1 = await createPet(org.id, 'Totó')
    const createdPet2 = await createPet(org.id, 'Rex')

    const { pets } = await sut.execute({
      orgId: org.id,
      page: 1,
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: createdPet1.id }),
        expect.objectContaining({ id: createdPet2.id }),
      ])
    )
  })

  it('should return an empty array if org has no pets', async () => {
    const org = await createOrg()

    const { pets } = await sut.execute({
      orgId: org.id,
      page: 1,
    })

    expect(pets).toHaveLength(0)
  })
})