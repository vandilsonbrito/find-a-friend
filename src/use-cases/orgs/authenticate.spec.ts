import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { hash } from 'bcryptjs'
import { AuthenticateOrgUseCase } from './authenticate'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateOrgUseCase

describe('Authenticate Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateOrgUseCase(orgsRepository)
  })

  it('should be able to authenticate as an Organization', async () => {
    await orgsRepository.create({
      name: 'John Doe',
      email: 'org1@example.com',
      password_hash: await hash('123456', 6),
      whatsapp: '11111111111',
      address: 'Rua Teste',
      city: 'Testelândia',
    })

    const { org } = await sut.execute({
      email: 'org1@example.com',
      password: '123456',
    })

    expect(org.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong credentials', async () => {
    await expect(() => {
      return sut.execute({
        email: 'email@example.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await orgsRepository.create({
      name: 'John Doe',
      email: 'org1@example.com',
      password_hash: await hash('123456', 6),
      whatsapp: '11111111111',
      address: 'Rua Teste',
      city: 'Testelândia',
    })

    await expect(() => {
      return sut.execute({
        email: 'org1@example.com',
        password: '123',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
