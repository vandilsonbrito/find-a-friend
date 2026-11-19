import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import path from 'path'

async function createOrgAndAuthenticate(email: string) {
  const orgResponse = await request(app.server).post('/orgs').send({
    name: 'Org',
    email,
    password: '123456',
    whatsapp: '11999999999',
    address: 'Rua Teste',
    city: 'São Paulo',
    description: 'Org description',
    state: 'SP',
    cep: '12345678',
  })

  const authResponse = await request(app.server)
    .post('/sessions')
    .send({ email, password: '123456' })

  return {
    orgId: orgResponse.body.org.id as string,
    accessToken: authResponse.body.accessToken as string,
  }
}

async function createPet(orgId: string, accessToken: string) {
  const response = await request(app.server)
    .post('/pets')
    .set('Authorization', `Bearer ${accessToken}`)
    .field('name', 'Pet')
    .field('description', 'Descrição')
    .field('age', 'puppy')
    .field('size', 'small')
    .field('energy_level', 'medium')
    .field('independence_level', 'medium')
    .field('environment', 'small')
    .field('sex', 'male')
    .field('type', 'dog')
    .field('breed', 'Breed')
    .field('city', 'São Paulo')
    .field('state', 'SP')
    .field('org_id', orgId)
    .attach('photos', path.resolve(__dirname, '../../../utils/test-image.jpg'))

  return response.body.pet.id as string
}

describe('Org Stats Controller - E2E', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  test('Should not be able to get stats if not authenticated', async () => {
    const response = await request(app.server).get('/me/stats').send()

    expect(response.statusCode).toEqual(401)
  })

  test('Should be able to get stats of the authenticated org', async () => {
    const org1 = await createOrgAndAuthenticate('org1@example.com')
    const org2 = await createOrgAndAuthenticate('org2@example.com')

    await createPet(org1.orgId, org1.accessToken)
    const adoptedPetId = await createPet(org1.orgId, org1.accessToken)

    await request(app.server)
      .patch(`/pets/${adoptedPetId}`)
      .set('Authorization', `Bearer ${org1.accessToken}`)
      .send({ is_adopted: true })

    await createPet(org2.orgId, org2.accessToken)

    const response = await request(app.server)
      .get('/me/stats')
      .set('Authorization', `Bearer ${org1.accessToken}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      stats: { total: 2, available: 1, adopted: 1 },
    })
  })
})
