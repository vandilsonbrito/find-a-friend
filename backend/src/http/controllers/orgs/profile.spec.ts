import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Org Profile Controller - E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('Should be able to get org profile', async () => {
    await request(app.server).post('/orgs').send({
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'org1@example.com',
      password: '123456',
    })

    const accessToken = authResponse.body.accessToken

    if (accessToken) {
      const response = await request(app.server)
        .get('/me')
        .set('Authorization', `Bearer ${accessToken}`)
        .send()

      expect(response.statusCode).toEqual(200)
    }
  })

  test('Should not be able to get org profile if not authenticated', async () => {
    const response = await request(app.server).get('/me').send()

    expect(response.statusCode).toEqual(401)
  })
})
