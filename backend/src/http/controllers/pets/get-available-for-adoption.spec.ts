import { describe, test, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { app } from '@/app'
import path from 'path'

let accessToken: string
let petId1: string
let petId2: string

describe('Get Available Pets For Adoption Controller - E2E', () => {
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
    console.log('body', createPetResponse1.body)
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

  test('Should get available pets without filters (default page)', async () => {
    const response = await request(app.server).get('/pets').send()

    expect(response.statusCode).toBe(200)
    expect(response.body.pets_data).toBeDefined()
    expect(Array.isArray(response.body.pets_data.pets)).toBe(true)
    expect(response.body.pets_data.total_pets).toBe(1)
    expect(response.body.pets_data.current_page).toBe(1)
  })

  test('Should get available pets with filters and pagination', async () => {
    const query = {
      city: 'São Paulo',
      age: 'puppy',
      size: 'small',
      energy_level: 'medium',
      independence_level: 'medium',
      environment: 'small',
      sex: 'male',
      type: 'dog',
      page: 2,
    }

    const response = await request(app.server).get('/pets').query(query).send()

    expect(response.statusCode).toBe(200)
    expect(response.body.pets_data).toBeDefined()
    expect(Array.isArray(response.body.pets_data.pets)).toBe(true)
    expect(response.body.pets_data.current_page).toBe(2)
  })

  test('Should return 400 for invalid query params', async () => {
    const response = await request(app.server)
      .get('/pets')
      .query({ age: 'invalid-age' })
      .send()

    expect(response.statusCode).toBe(400)
    expect(response.body.message).toContain('Validation error')
  })
})
