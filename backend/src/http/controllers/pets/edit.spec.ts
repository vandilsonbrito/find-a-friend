import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import path from 'path'

let accessToken: string
let petId1: string
let petId2: string

describe('Edit Pet Controller - E2E', () => {
  beforeAll(async () => {
    await app.ready()

    const orgResponse1 = await request(app.server).post('/orgs').send({
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

    const createPetResponse1 = await request(app.server)
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
      .field('org_id', orgResponse1.body.org_data.org.id)
      .attach(
        'photos',
        path.resolve(__dirname, '../../../utils/test-image.jpg'),
      )
    console.log('Body',createPetResponse1.body)
    petId1 = createPetResponse1.body.pet.id

    const response = await request(app.server)
      .patch(`/pets/${petId1}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'Pet Editado',
        description: 'Descrição editada',
        is_adopted: true,
      })
    expect(response.statusCode).toBe(200)

    const orgResponse2 = await request(app.server).post('/orgs').send({
      name: 'Org Tes2',
      email: 'orgtest2@example.com',
      password: '123456',
      whatsapp: '11999999999',
      address: 'Rua Teste',
      city: 'São Paulo',
      description: 'Org description',
      state: 'SP',
      cep: '12345678',
    })

    const createPetResponse2 = await request(app.server)
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
      .field('is_adopted', true)
      .field('org_id', orgResponse2.body.org_data.org.id)
      .attach(
        'photos',
        path.resolve(__dirname, '../../../utils/test-image.jpg'),
      )
    petId2 = createPetResponse2.body.pet.id
  })

  afterAll(async () => {
    await app.close()
  })

  test('Should edit pet with valid data', async () => {
    if (accessToken && petId1) {
      const response = await request(app.server)
        .patch(`/pets/${petId1}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'Pet Editado',
          description: 'Descrição editada',
          is_adopted: true,
        })

      expect(response.statusCode).toBe(200)
      expect(response.body.pet).toBeDefined()
      expect(response.body.pet.petUpdated.name).toBe('Pet Editado')
      expect(response.body.pet.petUpdated.description).toBe('Descrição editada')
      expect(response.body.pet.petUpdated.is_adopted).toBe(true)
    }
  })

  test('Should return 400 if no fields sent', async () => {
    if (accessToken && petId1) {
      const response = await request(app.server)
        .patch(`/pets/${petId1}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({})

      expect(response.statusCode).toBe(400)
      expect(response.body.message).toBe('At least one field must be sent.')
    }
  })

  test('Should return 400 if petId param is invalid UUID', async () => {
    const invalidPetId = 'invalid-uuid'
    if (accessToken) {
      const response = await request(app.server)
        .patch(`/pets/${invalidPetId}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'Nome qualquer',
        })

      expect(response.statusCode).toBe(400)
    }
  })

  test('Should return 403 if try to edit pet from another org', async () => {
    if (accessToken) {
      const response = await request(app.server)
        .patch(`/pets/${petId2}`)
        .set('Authorization', `Bearer ${accessToken}`)
        .send({})

      expect(response.statusCode).toBe(403)
      expect(response.body.message).toBe('Forbidden')
    }
  })

  test('Should return 401 if no auth token', async () => {
    const response = await request(app.server).patch(`/pets/${petId1}`).send({
      name: 'Pet Editado',
    })

    expect(response.statusCode).toBe(401)
  })
})
