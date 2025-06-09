import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import path from 'path'

let accessToken: string
let petId: string

describe('Edit Pet Controller - E2E', () => {
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

    accessToken = authResponse.body.accessToken

    const createPetResponse = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${accessToken}`)
      .field('name', 'Pet com imagem')
      .field('description', 'Descrição com imagem')
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
      .field('org_id', orgResponse.body.org_data.org.id)
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

  test('Should remove a pet successfully', async () => {
    if (accessToken && petId) {
      const deleteResponse = await request(app.server)
        .delete(`/pets/${petId}`)
        .set('Authorization', `Bearer ${accessToken}`)

      expect(deleteResponse.statusCode).toBe(204)

      const getResponse = await request(app.server)
        .get(`/pets/${petId}`)
        .set('Authorization', `Bearer ${accessToken}`)

      expect(getResponse.statusCode).toBe(404)
    }
  })

  test('Should return 400 if petId is not a valid UUID', async () => {
    const response = await request(app.server)
      .delete('/pets/not-a-uuid')
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(400)
  })

  test('Should return 404 if pet does not exist', async () => {
    const nonExistingPetId = '00000000-0000-0000-0000-000000000000'

    const response = await request(app.server)
      .delete(`/pets/${nonExistingPetId}`)
      .set('Authorization', `Bearer ${accessToken}`)

    expect(response.statusCode).toBe(404)
    expect(response.body.message).toBe('Pet not found')
  })

  test('Should return 401 if not authenticated', async () => {
    const response = await request(app.server).delete(`/pets/${petId}`)

    expect(response.statusCode).toBe(401)
  })
})
