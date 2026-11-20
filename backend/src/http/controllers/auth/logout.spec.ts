import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Logout Org Controller - E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('Should be able to logout', async () => {
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

    const response = await request(app.server).post('/sessions').send({
      email: 'org1@example.com',
      password: '123456',
    })

    const accessToken = response.body.accessToken
    expect(accessToken).toBeDefined()

    const logoutResponse = await request(app.server)
      .post('/logout')
      .set('Authorization', `Bearer ${accessToken}`)
    expect(logoutResponse.statusCode).toEqual(200)
  })

  test('Should not be able to logout if access token is invalid', async () => {
    const response = await request(app.server)
      .post('/logout')
      .set('Authorization', 'Bearer invalidtoken')
    expect(response.statusCode).toEqual(401)
  })
})
