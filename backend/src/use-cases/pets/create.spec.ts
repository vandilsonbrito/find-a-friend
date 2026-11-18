import { expect, describe, it, beforeEach, vi } from 'vitest'
import { CreatePetUseCase } from './create'
import { InMemoryPetsRepository } from '../../repositories/in-memory/in-memory-pets-repository'
import { InMemoryPetPhotosRepository } from '../../repositories/in-memory/in-memory-pet-photos-repository'
import { hash } from 'bcryptjs'
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository'
import { FakeStorageProvider } from '../../services/fake-storage-service'
import { IStorageProviderRepository } from '../../repositories/storage-provider-repository'
import { OrgNotFoundError } from '../errors/org-not-found-error'
import { CreatePetPhotosError } from '../errors/create-pet-photos-error'
import { CreatePetError } from '../errors/create-pet-error'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let petPhotosRepository: InMemoryPetPhotosRepository
let storageProvider: IStorageProviderRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    petPhotosRepository = new InMemoryPetPhotosRepository()
    storageProvider = new FakeStorageProvider()
    sut = new CreatePetUseCase(
      orgsRepository,
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
      description: 'Org description',
      state: 'SP',
      cep: '12345678',
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
      breed: 'Golden Retriever',
      sex: 'male',
      type: 'dog',
      org_id: org.id,
      city: 'John Doe',
      state: 'SP',
      photos: [
        { buffer: Buffer.from('fake-file-1.png'), filename: 'fake-file-1.png' },
        { buffer: Buffer.from('fake-file-2.png'), filename: 'fake-file-2.png' },
      ],
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not create a pet with a non-existing org', async () => {
    await expect(() =>
      sut.execute({
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
        org_id: 'non-existent-org',
        city: 'São Paulo',
        state: 'SP',
        photos: [
          {
            buffer: Buffer.from('fake-file-1.png'),
            filename: 'fake-file-1.png',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(OrgNotFoundError)
  })

  it('should save the uploaded url of each photo', async () => {
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

    const { pet } = await sut.execute({
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
      photos: [
        { buffer: Buffer.from('fake-file-1.png'), filename: 'fake-file-1.png' },
        { buffer: Buffer.from('fake-file-2.png'), filename: 'fake-file-2.png' },
      ],
    })

    expect(petPhotosRepository.items).toHaveLength(2)
    expect(petPhotosRepository.items).toEqual([
      expect.objectContaining({
        pet_id: pet.id,
        url: 'https://fake-storage.com/fake-image.jpg',
      }),
      expect.objectContaining({
        pet_id: pet.id,
        url: 'https://fake-storage.com/fake-image.jpg',
      }),
    ])
  })

  it('should not create a pet with empty photos', async () => {
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

    await expect(() =>
      sut.execute({
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
        photos: [],
      }),
    ).rejects.toBeInstanceOf(CreatePetPhotosError)
  })

  it('should not create a pet with more than 5 photos', async () => {
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

    await expect(() =>
      sut.execute({
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
        photos: [
          {
            buffer: Buffer.from('fake-file-1.png'),
            filename: 'fake-file-1.png',
          },
          {
            buffer: Buffer.from('fake-file-2.png'),
            filename: 'fake-file-2.png',
          },
          {
            buffer: Buffer.from('fake-file-3.png'),
            filename: 'fake-file-3.png',
          },
          {
            buffer: Buffer.from('fake-file-4.png'),
            filename: 'fake-file-4.png',
          },
          {
            buffer: Buffer.from('fake-file-5.png'),
            filename: 'fake-file-5.png',
          },
          {
            buffer: Buffer.from('fake-file-6.png'),
            filename: 'fake-file-6.png',
          },
        ],
      }),
    ).rejects.toBeInstanceOf(CreatePetPhotosError)
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
      description: 'Org description',
      state: 'SP',
      cep: '12345678',
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
      breed: 'Golden Retriever',
      sex: 'male',
      type: 'dog',
      org_id: org.id,
      city: 'São Paulo',
      state: 'SP',
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

  it('should throw if uploadFile fails for a photo', async () => {
    const org = await orgsRepository.create({
      name: 'Erro Org',
      email: 'org@example.com',
      password_hash: await hash('123456', 6),
      whatsapp: '11999999999',
      address: 'Rua Erro',
      city: 'São Paulo',
      description: 'Org description',
      state: 'SP',
      cep: '12345678',
      created_at: new Date(),
    })

    vi.spyOn(storageProvider, 'uploadFile').mockRejectedValueOnce(
      new Error('Cloudinary is down'),
    )

    await expect(() =>
      sut.execute({
        name: 'Rex',
        description: 'Energetic dog',
        age: 'adult',
        size: 'large',
        energy_level: 'high',
        independence_level: 'high',
        environment: 'large',
        breed: 'Golden Retriever',
        sex: 'male',
        type: 'dog',
        org_id: org.id,
        city: 'São Paulo',
        state: 'SP',
        photos: [{ buffer: Buffer.from('fail-file'), filename: 'fail.png' }],
      }),
    ).rejects.toBeInstanceOf(CreatePetError)
  })
})
