import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import { prisma } from '../../../../lib/prisma'
import { AuthTokenPayload } from '../../utils/auth-tokens'

function getRefreshCookie(response: request.Response) {
  const cookies = response.get('Set-Cookie') ?? []
  const cookie = cookies.find((c) => c.startsWith('refreshToken='))
  return cookie?.split(';')[0].replace('refreshToken=', '') ?? ''
}

function refreshWith(token: string) {
  return request(app.server)
    .patch('/token/refresh')
    .set('Cookie', [`refreshToken=${token}`])
    .send()
}

async function login(email: string) {
  const response = await request(app.server)
    .post('/sessions')
    .send({ email, password: '123456' })

  return {
    accessToken: response.body.accessToken as string,
    refreshToken: getRefreshCookie(response),
  }
}

describe('Refresh token revocation - E2E', () => {
  beforeAll(async () => {
    await app.ready()

    await request(app.server).post('/orgs').send({
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
  })

  afterAll(async () => {
    await app.close()
  })

  test('Should not accept a refresh token after logout', async () => {
    const { accessToken, refreshToken } = await login('org1@example.com')

    const logoutResponse = await request(app.server)
      .post('/logout')
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Cookie', [`refreshToken=${refreshToken}`])
      .send()
    expect(logoutResponse.statusCode).toEqual(200)

    const response = await refreshWith(refreshToken)
    expect(response.statusCode).toEqual(401)
  })

  test('Should not accept a refresh token that was already rotated', async () => {
    const { refreshToken: first } = await login('org1@example.com')

    const rotated = await refreshWith(first)
    expect(rotated.statusCode).toEqual(200)
    const second = getRefreshCookie(rotated)

    const { jti } = app.jwt.decode<AuthTokenPayload>(first) ?? {}

    const replacedRow = await prisma.refreshToken.findUnique({
      where: { id: jti },
    })
    expect(replacedRow?.replaced_at).not.toBeNull()

    await prisma.refreshToken.update({
      where: { id: jti },
      data: { replaced_at: new Date(Date.now() - 60 * 1000) },
    })

    const reused = await refreshWith(first)
    expect(reused.statusCode).toEqual(401)
    expect(reused.body.message).toEqual('Invalid refresh token.')

    // Detecção de roubo: o token "legítimo" mais novo também caiu.
    const afterTheft = await refreshWith(second)
    expect(afterTheft.statusCode).toEqual(401)
  })

  test('Should accept the same refresh token twice within the reuse interval', async () => {
    const { refreshToken } = await login('org1@example.com')

    // O StrictMode do React: dois refresh quase juntos, mesmo cookie.
    const firstCall = await refreshWith(refreshToken)
    const secondCall = await refreshWith(refreshToken)

    expect(firstCall.statusCode).toEqual(200)
    expect(secondCall.statusCode).toEqual(200)
  })

  test('Should not accept a refresh token without jti', async () => {
    const { accessToken } = await login('org1@example.com')
    const { sub } = app.jwt.decode<AuthTokenPayload>(accessToken) ?? {}

    const legacyRefreshToken = app.jwt.sign(
      { sub, type: 'refresh' },
      { expiresIn: '7d' },
    )

    const response = await refreshWith(legacyRefreshToken)
    expect(response.statusCode).toEqual(401)
  })

  test('Should set the refresh cookie to expire in 7 days', async () => {
    const response = await request(app.server)
      .post('/sessions')
      .send({ email: 'org1@example.com', password: '123456' })

    const cookie = (response.get('Set-Cookie') ?? []).find((c) =>
      c.startsWith('refreshToken='),
    )

    expect(cookie).toContain('Max-Age=604800;')
  })
})
