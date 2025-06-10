import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

let petId: string

describe('Get Pet Controller - E2E', () => {
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'orgtest@example.com',
      password: '123456',
    })

    const createPetResponse = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${authResponse.body.accessToken}`)
      .field('name', 'Pet para Get')
      .field('description', 'Descrição do pet')
      .field('age', 'puppy')
      .field('size', 'small')
      .field('energy_level', 'medium')
      .field('independence_level', 'medium')
      .field('environment', 'small')
      .field('sex', 'male')
      .field('type', 'dog')
      .field('breed', 'Breed Test')
      .field('city', 'São Paulo')
      .field('state', 'SP')
      .field('org_id', orgResponse.body.org_data.org.id)

    petId = createPetResponse.body.pet.id
  })

  afterAll(async () => {
    await app.close()
  })

  test('Should get pet by valid petId', async () => {
    if (petId) {
      const response = await request(app.server).get(`/pets/${petId}`).send()
      expect(response.statusCode).toBe(200)
      expect(response.body.pets_data.pet).toBeDefined()
      expect(response.body.pets_data.pet.id).toBe(petId)
      expect(response.body.pets_data.pet.name).toBe('Pet para Get')
    }
  })

  test('Should return 400 for invalid petId', async () => {
    const response = await request(app.server).get('/pets/invalid-uuid').send()

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toContain('Validation error')
  })

  test('Should return 404 if pet not found', async () => {
    const nonExistentPetId = '00e2e5a3-1091-4bc4-b1b4-323398107095'

    const response = await request(app.server)
      .get(`/pets/${nonExistentPetId}`)
      .send()

    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBeDefined()
  })
})
