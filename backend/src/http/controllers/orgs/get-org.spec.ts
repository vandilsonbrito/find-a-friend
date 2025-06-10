import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Get Org Controller - E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('Should be able to get org info', async () => {
    const createOrgResponse = await request(app.server).post('/orgs').send({
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

    await request(app.server).post('/sessions').send({
      email: 'org1@example.com',
      password: '123456',
    })

    const orgId = createOrgResponse.body.org_data.org.id

    if (orgId) {
      const response = await request(app.server).get(`/orgs/${orgId}`).send()

      expect(response.statusCode).toEqual(200)
      expect(response.body.org).toEqual({
        id: orgId,
        name: 'Org 1',
        whatsapp: '11999999999',
        address: 'Rua Teste',
        city: 'sao paulo',
        description: 'Org description',
        state: 'SP',
        cep: '12345678',
        created_at: expect.any(String),
      })
    }
  })

  test('Should not get org info if org does not exist', async () => {
    const response = await request(app.server)
      .get('/orgs/2e21e116-643a-4ab4-8216-1d8d0e563ab8')
      .send()

    expect(response.statusCode).toEqual(404)
  })
})
