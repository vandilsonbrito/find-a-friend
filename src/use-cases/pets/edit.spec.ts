import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryPetPhotosRepository } from '@/repositories/in-memory/in-memory-pet-photos-repository'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { IStorageProviderRepository } from '@/repositories/storage-provider-repository'
import { FakeStorageProvider } from '@/tests/mocks/fake-storage-service'
import { randomUUID } from 'node:crypto'
import { PetsNotFoundError } from '../errors/pet-not-found-error'
import { EdiPetUseCase } from './edit'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let petPhotosRepository: InMemoryPetPhotosRepository
let storageProvider: IStorageProviderRepository
let createPetUseCase: CreatePetUseCase
let sut: EdiPetUseCase

describe('Edit Pet Use Case', () => {
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
    sut = new EdiPetUseCase(petsRepository)
  })

  it('should be able to edit a pet', async () => {
    const org = await orgsRepository.create({
      name: 'John Doe',
      email: 'Z6m4I@example.com',
      password_hash: await hash('123456', 6),
      whatsapp: '11999999999',
      address: 'Rua Teste',
      city: 'São Paulo',
      created_at: new Date(),
    })

    const { pet: createdPet } = await createPetUseCase.execute({
      id: randomUUID(),
      name: 'Totó',
      description: 'friendly golden retriever',
      age: 'puppy',
      size: 'medium',
      energy_level: 'low',
      independence_level: 'medium',
      environment: 'medium',
      org_id: org.id,
      city: 'São Paulo',
      photos: [
        { buffer: Buffer.from('fake-file-1.png'), filename: 'fake-file-1.png' },
      ],
    })

    const { petUpdated } = await sut.execute({
      petId: createdPet.id,
      name: 'Rex',
      environment: 'large',
    })

    expect(petUpdated.id).toEqual(createdPet.id)
    expect(petUpdated.name).toBe('Rex')
    expect(petUpdated.environment).toBe('large')
  })

  it('should throw PetNotFoundError if pet does not exist', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(PetsNotFoundError)
  })
})
