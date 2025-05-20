import { expect, describe, it, beforeEach, vi } from 'vitest'
import { CreatePetUseCase } from './create'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryPetPhotosRepository } from '@/repositories/in-memory/in-memory-pet-photos-repository'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { FakeStorageProvider } from '@/tests/mocks/fake-storage-service'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let petPhotosRepository: InMemoryPetPhotosRepository
let storageProvider: FakeStorageProvider
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    petPhotosRepository = new InMemoryPetPhotosRepository()
    storageProvider = new FakeStorageProvider()
    sut = new CreatePetUseCase(
      petsRepository,
      petPhotosRepository,
      storageProvider,
    )
  })

  it('should be able to create a Pet', async () => {
    const org = await orgsRepository.create({
      name: 'John Doe',
      email: 'Z6m4I@example.com',
      password_hash: await hash('123456', 6),
      whatsapp: '11999999999',
      address: 'Rua Teste',
      city: 'São Paulo',
      created_at: new Date(),
    })

    const { pet } = await sut.execute({
      name: 'Totó',
      description: 'friendly golden retriever',
      age: 'puppy',
      size: 'medium',
      energy_level: 'low',
      independence_level: 'medium',
      environment: 'medium',
      org_id: org.id,
      city: 'John Doe',
      photos: [
        { buffer: Buffer.from('fake-file-1.png'), filename: 'fake-file-1.png' },
        { buffer: Buffer.from('fake-file-2.png'), filename: 'fake-file-2.png' },
      ],
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should upload each photo passed to the storage provider', async () => {
    const uploadSpy = vi.spyOn(storageProvider, 'uploadFile')

    const org = await orgsRepository.create({
      name: 'Patinhas',
      email: 'Z6m4I@example.com',
      password_hash: await hash('123456', 6),
      whatsapp: '11999999999',
      address: 'Rua Teste',
      city: 'São Paulo',
      created_at: new Date(),
    })

    await sut.execute({
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
        { buffer: Buffer.from('fake-file-1'), filename: 'fake-file-1.png' },
        { buffer: Buffer.from('fake-file-2'), filename: 'fake-file-2.png' },
      ],
    })

    expect(uploadSpy).toHaveBeenCalledTimes(2)
    expect(uploadSpy).toHaveBeenCalledWith(
      expect.any(Buffer),
      'fake-file-1.png',
    )
    expect(uploadSpy).toHaveBeenCalledWith(
      expect.any(Buffer),
      'fake-file-2.png',
    )
  })
})
