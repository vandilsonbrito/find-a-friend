import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { EditOrgUseCase } from './edit'

let orgsRepository: InMemoryOrgsRepository
let sut: EditOrgUseCase

describe('Edit Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new EditOrgUseCase(orgsRepository)
  })

  it('should be able to edit an existing organization', async () => {
    const createdOrg = await orgsRepository.create({
      name: 'Old Name',
      email: 'org@example.com',
      password_hash: await hash('123456', 6),
      whatsapp: '11999999999',
      address: 'Old Address',
      city: 'sao paulo',
      description: 'Old description',
      state: 'SP',
      cep: '12345678',
      created_at: new Date(),
    })

    const { org } = await sut.execute({
      id: createdOrg.id,
      name: 'New Name',
      address: 'New Address',
      city: 'rio de janeiro',
      description: 'Updated description',
    })

    expect(org.id).toEqual(createdOrg.id)
    expect(org.name).toBe('New Name')
    expect(org.address).toBe('New Address')
    expect(org.description).toBe('Updated description') 
  })

  it('should keep unchanged fields if not provided', async () => {
    const createdOrg = await orgsRepository.create({
      name: 'Org Name',
      email: 'org@example.com',
      password_hash: await hash('123456', 6),
      whatsapp: '11999999999',
      address: 'Address',
      city: 'sao paulo',
      description: 'Description',
      state: 'SP',
      cep: '12345678',
      created_at: new Date(),
    })

    const { org } = await sut.execute({
      id: createdOrg.id,
      name: 'Updated Name',
    })

    expect(org.name).toBe('Updated Name')
    expect(org.address).toBe('Address')
    expect(org.city).toBe('sao paulo')
    expect(org.description).toBe('Description')
  })

  it('should throw an error if organization does not exist', async () => {
    await expect(() =>
      sut.execute({
        id: 'non-existent-id' as any,
        name: 'Does not matter',
      }),
    ).rejects.toThrowError('Organization not found.')
  })

})