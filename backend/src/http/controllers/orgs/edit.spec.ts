import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

let orgId: string | null = null
describe('Edit Org Controller - E2E', () => {
  beforeAll(async () => {
    await app.ready()

    const orgResponse = await request(app.server).post('/orgs').send({
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

    orgId = orgResponse.body.org.id
  })

  afterAll(async () => {
    await app.close()
  })

  test('Should be able to edit an org', async () => {
    const authResponse = await request(app.server).post('/sessions').send({
      email: 'org1@example.com',
      password: '123456',
    })

    const accessToken = authResponse.body.access_token

    if (orgId && accessToken) {
      const response = await request(app.server)
        .patch(`/orgs/${orgId}/profile`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'Org 2',
          whatsapp: '11111111111',
          address: 'Rua Teste2',
        })
      expect(response.statusCode).toEqual(200)
      expect(response.body.org).toEqual({
        id: orgId,
        name: 'Org 2',
        whatsapp: '11111111111',
        address: 'Rua Teste 2',
      })
    }
  })

  test('Should not allow editing without authentication', async () => {
    const response = await request(app.server)
      .patch(`/orgs/some-id/profile`)
      .send({ name: 'New Name' })

    expect(response.statusCode).toEqual(401)
  })

  test('Should not allow editing another org profile', async () => {
    const orgA = await request(app.server).post('/orgs').send({
      name: 'Org A',
      description: 'Org A description',
      email: 'orga@example.com',
      password: '123456',
      whatsapp: '1111111111',
      address: 'Rua A',
      city: 'City',
      state: 'ST',
      cep: '12345678',
    })
    expect(orgA.statusCode).toBe(201)

    const sessionA = await request(app.server).post('/sessions').send({
      email: 'orga@example.com',
      password: '123456',
    })
    const tokenA = sessionA.body.access_token

    const orgB = await request(app.server).post('/orgs').send({
      name: 'Org B',
      description: 'Org B description',
      email: 'orgb@example.com',
      password: '123456',
      whatsapp: '2222222222',
      address: 'Rua B',
      city: 'City',
      state: 'ST',
      cep: '87654321',
    })

    expect(orgB.statusCode).toBe(201)

    const orgBId = orgB.body.org.id

    if (orgBId && tokenA) {
      const response = await request(app.server)
        .patch(`/orgs/${orgBId}/profile`)
        .set('Authorization', `Bearer ${tokenA}`)
        .send({ name: 'Malicious Edit' })

      expect(response.statusCode).toEqual(403)
    }
  })

  test('Should return 404 if org ID does not exist', async () => {
    const fakeId = '6566ee97-57af-4eb5-b35f-1afe3f1a1006'

    const auth = await request(app.server).post('/sessions').send({
      email: 'org1@example.com',
      password: '123456',
    })

    const accessToken = auth.body.access_token

    if (accessToken) {
      const response = await request(app.server)
        .patch(`/orgs/${fakeId}/profile`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({ name: 'Name' })

      expect(response.statusCode).toEqual(404)
    }
  })
})
