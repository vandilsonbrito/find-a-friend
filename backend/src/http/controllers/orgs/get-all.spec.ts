import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Get All Orgs Controller - E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('Should get an empty list of orgs', async () => {
    const response = await request(app.server).get('/orgs').send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.orgsList).toHaveLength(0)
  })

  test('Should be able to get all orgs', async () => {
    const org1 = await request(app.server).post('/orgs').send({
      name: 'Org 1',
      email: 'org1@example.com',
      password: '123456',
      whatsapp: '11999999999',
      address: 'Rua Teste',
      city: 'São Paulo',
      description: 'Org description',
      state: 'SP',
      cep: '12345678',
    })

    const org2 = await request(app.server).post('/orgs').send({
      name: 'Org 2',
      email: 'org2@example.com',
      password: '123456',
      whatsapp: '11999999999',
      address: 'Rua Teste',
      city: 'São Paulo',
      description: 'Org description',
      state: 'SP',
      cep: '12345678',
    })

    const response = await request(app.server).get('/orgs').send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.orgsList).toHaveLength(2)
    expect(response.body.orgsList).toEqual([
      expect.objectContaining({
        id: org1.body.org.id,
      }),
      expect.objectContaining({
        id: org2.body.org.id,
      }),
    ])
  })
})
