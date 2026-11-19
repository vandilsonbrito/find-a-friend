import { expect, describe, it, beforeEach } from 'vitest'
import { CreatePetUseCase } from './create'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { InMemoryPetPhotosRepository } from '../../repositories/in-memory/in-memory-pet-photos-repository'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository'
import { IStorageProviderRepository } from '../../repositories/storage-provider-repository'
import { FakeStorageProvider } from '../../services/fake-storage-service'
import { randomUUID } from 'node:crypto'
import { PetsNotFoundError } from '../errors/pet-not-found-error'
import { NotAllowedError } from '../errors/not-allowed-error'
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
      description: 'Org description',
      state: 'SP',
      cep: '12345678',
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
      breed: 'Golden Retriever',
      sex: 'male',
      type: 'dog',
      org_id: org.id,
      city: 'São Paulo',
      state: 'SP',
      photos: [{ buffer: Buffer.from('fake-file-1.png') }],
    })

    const { petUpdated } = await sut.execute({
      petId: createdPet.id,
      orgId: org.id,
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
        orgId: 'any-org-id',
      }),
    ).rejects.toBeInstanceOf(PetsNotFoundError)
  })

  it('should not be able to edit a pet from another org', async () => {
    const ownerOrg = await orgsRepository.create({
      name: 'Owner Org',
      email: 'owner@example.com',
      password_hash: await hash('123456', 6),
      whatsapp: '11999999999',
      address: 'Rua Teste',
      city: 'São Paulo',
      description: 'Org description',
      state: 'SP',
      cep: '12345678',
      created_at: new Date(),
    })

    const otherOrg = await orgsRepository.create({
      name: 'Other Org',
      email: 'other@example.com',
      password_hash: await hash('123456', 6),
      whatsapp: '11888888888',
      address: 'Rua Outra',
      city: 'São Paulo',
      description: 'Org description',
      state: 'SP',
      cep: '12345678',
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
      breed: 'Golden Retriever',
      sex: 'male',
      type: 'dog',
      org_id: ownerOrg.id,
      city: 'São Paulo',
      state: 'SP',
      photos: [{ buffer: Buffer.from('fake-file-1.png') }],
    })

    await expect(() =>
      sut.execute({
        petId: createdPet.id,
        orgId: otherOrg.id,
        name: 'Hacked',
      }),
    ).rejects.toBeInstanceOf(NotAllowedError)

    expect(petsRepository.pets[0].name).toBe('Totó')
  })
})
