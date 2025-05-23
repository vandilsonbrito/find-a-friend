import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { InMemoryPetPhotosRepository } from '../../repositories/in-memory/in-memory-pet-photos-repository'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository'
import { IStorageProviderRepository } from '../../repositories/storage-provider-repository'
import { FakeStorageProvider } from '../../tests/mocks/fake-storage-service'
import { randomUUID } from 'node:crypto'
import { GetPetUseCase } from './get-pet'
import { PetsNotFoundError } from '../errors/pet-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let petPhotosRepository: InMemoryPetPhotosRepository
let storageProvider: IStorageProviderRepository
let createPetUseCase: CreatePetUseCase
let sut: GetPetUseCase

describe('Get Pet Use Case', () => {
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
    sut = new GetPetUseCase(petsRepository)
  })

  it('should be able to get pet details by id', async () => {
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

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.id).toEqual(createdPet.id)
    expect(pet.name).toBe('Totó')
  })

  it('should throw PetNotFoundError if pet does not exist', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(PetsNotFoundError)
  })
})
