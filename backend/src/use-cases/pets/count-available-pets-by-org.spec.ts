import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository'
import { InMemoryPetPhotosRepository } from '../../repositories/in-memory/in-memory-pet-photos-repository'
import { CountAvailablePetsByOrgUseCase } from './count-available-pets-by-org'
import { CreatePetUseCase } from './create'
import { hash } from 'bcryptjs'
import { FakeStorageProvider } from '../../tests/mocks/fake-storage-service'
import { IStorageProviderRepository } from '../../repositories/storage-provider-repository'
import { randomUUID } from 'node:crypto'

let petsRepository: InMemoryPetsRepository
let orgsRepository: InMemoryOrgsRepository
let petPhotosRepository: InMemoryPetPhotosRepository
let storageProvider: IStorageProviderRepository
let createPetUseCase: CreatePetUseCase
let sut: CountAvailablePetsByOrgUseCase

describe('Count Available Pets By Org Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    orgsRepository = new InMemoryOrgsRepository()
    petPhotosRepository = new InMemoryPetPhotosRepository()
    storageProvider = new FakeStorageProvider()
    createPetUseCase = new CreatePetUseCase(
      orgsRepository,
      petsRepository,
      petPhotosRepository,
      storageProvider,
    )
    sut = new CountAvailablePetsByOrgUseCase(petsRepository)
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

  async function createPet({
    orgId,
    name,
    isAdopted = false,
  }: {
    orgId: string
    name: string
    isAdopted?: boolean
  }) {
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

    if (isAdopted) {
      const { is_adopted, photos, ...rest } = pet;
      const petAdopted = { ...rest, is_adopted: !is_adopted };
      await petsRepository.update(petAdopted);
    }

    return pet
  }

  it('should be able to count available pets by org', async () => {
    const org = await createOrg()

    await createPet({ orgId: org.id, name: 'Pet 1' })
    await createPet({ orgId: org.id, name: 'Pet 2' })
    await createPet({ orgId: org.id, name: 'Pet 3', isAdopted: true }) 

    const { count } = await sut.execute(org.id)

    expect(count).toBe(2)
  })

  it('should return 0 if there are no pets for the org', async () => {
    const org = await createOrg()

    const { count } = await sut.execute(org.id)

    expect(count).toBe(0)
  })
})