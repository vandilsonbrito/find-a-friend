import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Refresh Token Controller - E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('Should be able to refresh token', async () => {
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

    const cookies = response.get('Set-Cookie')
    expect(cookies).toBeDefined()

    const responseRefresh = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies as string[])
      .send()

    expect(responseRefresh.statusCode).toEqual(200)
    expect(responseRefresh.body).toHaveProperty('accessToken')

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${responseRefresh.body.accessToken}`)
      .send()

    expect(profileResponse.statusCode).toEqual(200)
  })

  test('Should not refresh token if refresh token is missing', async () => {
    const response = await request(app.server).patch('/token/refresh').send()

    expect(response.statusCode).toEqual(401)
    expect(response.body.message).toEqual('Refresh token missing.')
  })

  test('Should not refresh token if refresh token is invalid', async () => {
    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', ['refreshToken=invalidtoken'])
      .send()

    expect(response.statusCode).toEqual(401)
    expect(response.body.message).toEqual('Invalid refresh token.')
  })
})
