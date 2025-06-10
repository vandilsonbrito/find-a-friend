import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import path from 'path'

let accessToken: string
let orgId: string
let petId: string

describe('Get Org Pets Controller - E2E', () => {
  beforeAll(async () => {
    await app.ready()

    const orgResponse = await request(app.server).post('/orgs').send({
      name: 'Org Test',
      email: 'orgtest@example.com',
      password: '123456',
      whatsapp: '11999999999',
      address: 'Rua Teste',
      city: 'São Paulo',
      description: 'Org description',
      state: 'SP',
      cep: '12345678',
    })

    orgId = orgResponse.body.org_data.org.id

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'orgtest@example.com',
      password: '123456',
    })

    accessToken = authResponse.body.accessToken

    const createPetResponse = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${accessToken}`)
      .field('name', 'Pet Org 1')
      .field('description', 'Descrição pet org')
      .field('age', 'puppy')
      .field('size', 'small')
      .field('energy_level', 'medium')
      .field('independence_level', 'medium')
      .field('environment', 'small')
      .field('sex', 'male')
      .field('type', 'dog')
      .field('breed', 'Breed 3')
      .field('city', 'São Paulo')
      .field('state', 'SP')
      .field('org_id', orgId)
      .attach(
        'photos',
        path.resolve(__dirname, '../../../utils/test-image.jpg'),
      )

    expect(createPetResponse.statusCode).toBe(201)

    petId = createPetResponse.body.pet.id
  })

  afterAll(async () => {
    await app.close()
  })

  test('Should get pets for org with default page', async () => {
    if (accessToken && orgId) {
      const response = await request(app.server)
        .get(`/orgs/${orgId}/pets`)
        .set('Authorization', `Bearer ${accessToken}`)

      expect(response.statusCode).toBe(200)
      expect(response.body.pets).toBeDefined()
      expect(Array.isArray(response.body.pets.pets)).toBe(true)
      expect(response.body.pets.current_page).toBe(1)
    }
  })

  test('Should get pets for org with specific page', async () => {
    if (accessToken && orgId) {
      const response = await request(app.server)
        .get(`/orgs/${orgId}/pets/${2}`)
        .set('Authorization', `Bearer ${accessToken}`)

      expect(response.statusCode).toBe(200)
      expect(response.body.pets).toBeDefined()
      expect(Array.isArray(response.body.pets.pets)).toBe(true)
      expect(response.body.pets.current_page).toBe(2)
    }
  })

  test('Should return 400 for invalid orgId', async () => {
    const invalidOrgId = 'invalid-org-id'

    const response = await request(app.server)
      .get(`/orgs/${invalidOrgId}/pets`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(400)
  })

  test('Should return empty array if org has no pets', async () => {
    const newOrgResponse = await request(app.server).post('/orgs').send({
      name: 'Empty Org',
      email: 'emptyorg@example.com',
      password: '123456',
      whatsapp: '11999999998',
      address: 'Rua Vazia',
      city: 'Rio de Janeiro',
      description: 'Org sem pets',
      state: 'RJ',
      cep: '87654321',
    })

    const newOrgId = newOrgResponse.body.org_data.org.id

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'emptyorg@example.com',
      password: '123456',
    })

    const token = authResponse.body.accessToken

    const response = await request(app.server)
      .get(`/orgs/${newOrgId}/pets`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(Array.isArray(response.body.pets.pets)).toBe(true)
    expect(response.body.pets.pets.length).toBe(0)
  })

  test('Should return 401 if not authenticated', async () => {
    const response = await request(app.server).get(`/orgs/${orgId}/pets`)

    expect(response.statusCode).toBe(401)
  })
})
