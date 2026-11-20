import { afterAll, beforeAll, describe, expect, test } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import path from 'path'
import { CreatePetPhotosError } from '@/use-cases/errors/create-pet-photos-error'

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

  test('Should create the pet for the authenticated org, ignoring org_id from the body', async () => {
    const otherOrgResponse = await request(app.server).post('/orgs').send({
      name: 'Org 2',
      email: 'org2@example.com',
      password: '123456',
      whatsapp: '11999999999',
      address: 'Rua Teste',
      city: 'São Paulo',
      description: 'Org description',
      state: 'SP',
      cep: '12345678',
    })
    const otherOrgId = otherOrgResponse.body.org.id

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${accessToken}`)
      .field('name', 'Pet intruso')
      .field('description', 'Tentativa de criar pet em outra ONG')
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
      .field('org_id', otherOrgId)
      .attach(
        'photos',
        path.resolve(__dirname, '../../../utils/test-image.jpg'),
      )

    expect(response.statusCode).toBe(201)
    expect(response.body.pet.org_id).toEqual(orgId)
    expect(response.body.pet.org_id).not.toEqual(otherOrgId)
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
        })
      // 406 vem do @fastify/multipart: a rota só aceita multipart/form-data
      expect(createPetResponse2.statusCode).toEqual(406)
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
        .attach(
          'photos',
          path.resolve(__dirname, '../../../utils/test-image.jpg'),
        )
      expect(createPetResponse2.statusCode).toEqual(400)
    }
  })

  // Função auxiliar para criar uma requisição de criação de pet com um número específico de fotos
  function createPetRequestWithPhotos(photoCount: number) {
    const req = request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${accessToken}`)
      .field('name', 'Pet fotos')
      .field('description', 'Teste da regra de fotos')
      .field('age', 'puppy')
      .field('size', 'small')
      .field('energy_level', 'medium')
      .field('independence_level', 'medium')
      .field('environment', 'small')
      .field('sex', 'male')
      .field('type', 'dog')
      .field('breed', 'Breed 3')
      .field('city', 'Recife')
      .field('state', 'PE')

    for (let i = 0; i < photoCount; i++) {
      req.attach(
        'photos',
        path.resolve(__dirname, '../../../utils/test-image.jpg'),
      )
    }

    return req
  }

  test('Should not be able to create a pet with no photos', async () => {
    const response = await createPetRequestWithPhotos(0)

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toEqual(new CreatePetPhotosError().message)
  })

  test('Should not be able to create a pet with more than 5 photos', async () => {
    const response = await createPetRequestWithPhotos(6)

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toEqual(new CreatePetPhotosError().message)
  })
})
