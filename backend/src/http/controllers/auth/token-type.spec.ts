import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

let orgId: string
let accessToken: string
let refreshToken: string

describe('Token type (access x refresh) - E2E', () => {
  beforeAll(async () => {
    await app.ready()

    const orgResponse = await request(app.server).post('/orgs').send({
      name: 'Org 1',
      email: 'org1@example.com',
      password: '123456',
      whatsapp: '11999999999',
      address: 'Rua Teste',
      city: 'São Paulo',
      description: 'Org description',
      state: 'SP',
      cep: '12345678',
    })
    orgId = orgResponse.body.org.id

    const authResponse = await request(app.server)
      .post('/sessions')
      .send({ email: 'org1@example.com', password: '123456' })

    accessToken = authResponse.body.accessToken

    const cookies = authResponse.get('Set-Cookie') ?? []
    const refreshCookie = cookies.find((c) => c.startsWith('refreshToken='))
    refreshToken =
      refreshCookie?.split(';')[0].replace('refreshToken=', '') ?? ''

    if (!accessToken || !refreshToken) {
      throw new Error('Tokens not found')
    }
  })

  afterAll(async () => {
    await app.close()
  })

  test('Should not accept a refresh token as access token', async () => {
    const response = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${refreshToken}`)
      .send()

    expect(response.statusCode).toEqual(401)
  })

  test('Should not accept an access token as refresh token', async () => {
    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', [`refreshToken=${accessToken}`])
      .send()

    expect(response.statusCode).toEqual(401)
  })

  test('Should not accept a token without type in either route', async () => {
    const legacyToken = app.jwt.sign({ sub: orgId }, { expiresIn: '7d' })

    const asAccess = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${legacyToken}`)
      .send()

    const asRefresh = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', [`refreshToken=${legacyToken}`])
      .send()

    expect(asAccess.statusCode).toEqual(401)
    expect(asRefresh.statusCode).toEqual(401)
  })
})
