import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '../../repositories/in-memory/in-memory-orgs-repository'
import { GetOrgProfileUseCase } from './get-org-profile'
import { hash } from 'bcryptjs'
import { OrgNotFoundError } from '../errors/org-not-found-error'

let orgsRepository: InMemoryOrgsRepository
let sut: GetOrgProfileUseCase

describe('Get Org Profile Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new GetOrgProfileUseCase(orgsRepository)
  })

  it('should be able to get Organization profile', async () => {
    const createdOrg = await orgsRepository.create({
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

    const { org } = await sut.execute({
      orgId: createdOrg.id,
    })
    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to get Organization profile with wrong id', async () => {
    await expect(() => {
      return sut.execute({
        orgId: 'non-existing-id',
      })
    }).rejects.toBeInstanceOf(OrgNotFoundError)
  })
})
