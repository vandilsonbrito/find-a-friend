import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { InMemoryPetPhotosRepository } from '../../repositories/in-memory/in-memory-pet-photos-repository'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository'
import { GetPetsAvailableForAdoptionUseCase } from './get-available-for-adoption'
import { IStorageProviderRepository } from '../../repositories/storage-provider-repository'
import { FakeStorageProvider } from '../../tests/mocks/fake-storage-service'
import { randomUUID } from 'node:crypto'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let petPhotosRepository: InMemoryPetPhotosRepository
let storageProvider: IStorageProviderRepository
let createPetUseCase: CreatePetUseCase
let sut: GetPetsAvailableForAdoptionUseCase

describe('Get Available Pets For Adoption Use Case', () => {
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
    sut = new GetPetsAvailableForAdoptionUseCase(petsRepository)
  })

  it('should be able to get available pets for adoption by city and filters', async () => {
    const org = await orgsRepository.create({
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

    const pet1 = await createPetUseCase.execute({
      id: randomUUID(),
      name: 'Totó',
      description: 'friendly golden retriever',
      age: 'puppy',
      size: 'medium',
      energy_level: 'low',
      independence_level: 'medium',
      environment: 'medium',
      breed: 'Golden Retriever',
      sex: 'male',
      type: 'dog',
      org_id: org.id,
      city: 'São Paulo',
      photos: [
        { buffer: Buffer.from('fake-file-1.png'), filename: 'fake-file-1.png' },
        { buffer: Buffer.from('fake-file-2.png'), filename: 'fake-file-2.png' },
      ],
    })
    const pet2 = await createPetUseCase.execute({
      id: randomUUID(),
      name: 'Bryan',
      description: 'friendly border collie',
      age: 'adult',
      size: 'medium',
      energy_level: 'high',
      independence_level: 'medium',
      environment: 'medium',
      breed: 'Golden Retriever',
      sex: 'male',
      type: 'dog',
      org_id: org.id,
      city: 'São Paulo',
      photos: [
        { buffer: Buffer.from('fake-file-1.png'), filename: 'fake-file-1.png' },
        { buffer: Buffer.from('fake-file-2.png'), filename: 'fake-file-2.png' },
      ],
    })

    expect(org.id).toEqual(expect.any(String))
    expect(pet1.pet.id).toEqual(expect.any(String))
    expect(pet2.pet.id).toEqual(expect.any(String))

    const { pets } = await sut.execute({
      city: 'São Paulo',
      age: 'adult',
      size: 'medium',
      page: 1,
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([expect.objectContaining({ id: pet2.pet.id })])
  })

  it('should return an empty list when no pets match the provided city', async () => {
    const org = await orgsRepository.create({
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

    const pet1 = await createPetUseCase.execute({
      id: randomUUID(),
      name: 'Totó',
      description: 'friendly golden retriever',
      age: 'puppy',
      size: 'medium',
      energy_level: 'low',
      independence_level: 'medium',
      environment: 'medium',
      breed: 'Golden Retriever',
      sex: 'male',
      type: 'dog',
      org_id: org.id,
      city: 'São Paulo',
      photos: [
        { buffer: Buffer.from('fake-file-1.png'), filename: 'fake-file-1.png' },
        { buffer: Buffer.from('fake-file-2.png'), filename: 'fake-file-2.png' },
      ],
    })
    const pet2 = await createPetUseCase.execute({
      id: randomUUID(),
      name: 'Bryan',
      description: 'friendly border collie',
      age: 'adult',
      size: 'medium',
      energy_level: 'high',
      independence_level: 'medium',
      environment: 'medium',breed: 'Golden Retriever',
      sex: 'male',
      type: 'dog',
      org_id: org.id,
      city: 'São Paulo',
      photos: [
        { buffer: Buffer.from('fake-file-1.png'), filename: 'fake-file-1.png' },
        { buffer: Buffer.from('fake-file-2.png'), filename: 'fake-file-2.png' },
      ],
    })

    expect(org.id).toEqual(expect.any(String))
    expect(pet1.pet.id).toEqual(expect.any(String))
    expect(pet2.pet.id).toEqual(expect.any(String))

    const { pets } = await sut.execute({
      city: 'Rio de Janeiro',
      page: 1,
    })

    expect(pets).toHaveLength(0)
  })

  it('should return all available pets in a city when no additional filters are provided', async () => {
    const org = await orgsRepository.create({
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

    const pet1 = await createPetUseCase.execute({
      id: randomUUID(),
      name: 'Totó',
      description: 'friendly golden retriever',
      age: 'puppy',
      size: 'medium',
      energy_level: 'low',
      independence_level: 'medium',
      environment: 'medium',
      breed: 'Golden Retriever',
      sex: 'male',
      type: 'dog',
      org_id: org.id,
      city: 'São Paulo',
      photos: [
        { buffer: Buffer.from('fake-file-1.png'), filename: 'fake-file-1.png' },
        { buffer: Buffer.from('fake-file-2.png'), filename: 'fake-file-2.png' },
      ],
    })
    const pet2 = await createPetUseCase.execute({
      id: randomUUID(),
      name: 'Bryan',
      description: 'friendly border collie',
      age: 'adult',
      size: 'medium',
      energy_level: 'high',
      independence_level: 'medium',
      environment: 'medium',
      breed: 'Golden Retriever',
      sex: 'male',
      type: 'dog',
      org_id: org.id,
      city: 'São Paulo',
      photos: [
        { buffer: Buffer.from('fake-file-1.png'), filename: 'fake-file-1.png' },
        { buffer: Buffer.from('fake-file-2.png'), filename: 'fake-file-2.png' },
      ],
    })
    expect(org.id).toEqual(expect.any(String))
    expect(pet1.pet.id).toEqual(expect.any(String))
    expect(pet2.pet.id).toEqual(expect.any(String))

    const { pets } = await sut.execute({
      city: 'São Paulo',
      page: 1,
    })

    expect(pets).toHaveLength(2)
  })
})
