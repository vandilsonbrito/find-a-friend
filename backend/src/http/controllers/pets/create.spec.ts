import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import path from 'path'

let orgId: string | null = null
let accessToken: string | null = null
describe('Create Pet Controller - E2E', () => {
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'org1@example.com',
      password: '123456',
    })

    accessToken = authResponse.body.accessToken
    orgId = orgResponse.body.org.id

    if (!accessToken) {
      throw new Error('Access token not found')
    }
    if (!orgId) {
      throw new Error('Org id not found')
    }
  })

  afterAll(async () => {
    await app.close()
  })

  test('Should not be able to create a pet without authentication', async () => {
    if (orgId) {
      const createPetResponse = await request(app.server)
        .post('/pets')
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
        .field('org_id', orgId as string)
        .attach(
          'photos',
          path.resolve(__dirname, '../../../utils/test-image.jpg'),
        )

      expect(createPetResponse.statusCode).toEqual(401)
    }
  })

  test('Should be able to create a pet with image', async () => {
    if (accessToken && orgId) {
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
        .field('org_id', orgId)
        .attach(
          'photos',
          path.resolve(__dirname, '../../../utils/test-image.jpg'),
        )

      expect(createPetResponse.statusCode).toBe(201)
      expect(createPetResponse.body.pet).toBeDefined()
      expect(createPetResponse.body.pet.photos).toBeInstanceOf(Array)
      expect(createPetResponse.body.pet.photos.length).toBeGreaterThan(0)
    }
  })

  test('Should not be able to create a pet without org ID or with invalid org ID', async () => {
    if (accessToken) {
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
        .attach(
          'photos',
          path.resolve(__dirname, '../../../utils/test-image.jpg'),
        )

      expect(createPetResponse1.statusCode).toEqual(400)

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
        .field('org_id', 'invalid-org-id')
        .attach(
          'photos',
          path.resolve(__dirname, '../../../utils/test-image.jpg'),
        )

      expect(createPetResponse2.statusCode).toEqual(400)
    }
  })

  test('Should not be able to create a pet with wrong format data type (Content-Type: application/json)', async () => {
    if (accessToken && orgId) {
      const createPetResponse2 = await request(app.server)
        .post('/pets')
        .set('Authorization', `Bearer ${accessToken}`)
        .send({
          name: 'Pet 1',
          description: 'Pet 1 description',
          age: 'puppy',
          size: 'small',
          energy_level: 'low',
          independence_level: 'low',
          environment: 'small',
          sex: 'male',
          type: 'dog',
          breed: 'Breed 1',
          city: 'São Paulo',
          state: 'SP',
          photos: [],
          org_id: orgId,
        })
      expect(createPetResponse2.statusCode).toEqual(400)
    }
  })
  test('Should not be able to create a pet with invalid data/missing data', async () => {
    if (accessToken && orgId) {
      const createPetResponse2 = await request(app.server)
        .post('/pets')
        .set('Authorization', `Bearer ${accessToken}`)
        .field('name', 'Pet com imagem')
        .field('description', 'Descrição com imagem')
        .field('state', 'SP')
        .field('org_id', orgId)
        .attach(
          'photos',
          path.resolve(__dirname, '../../../utils/test-image.jpg'),
        )
      expect(createPetResponse2.statusCode).toEqual(400)
    }
  })
})
