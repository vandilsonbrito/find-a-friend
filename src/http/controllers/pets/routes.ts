import { FastifyInstance } from 'fastify'
import { createPet } from './create'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { getAvailablePetsForAdoption } from './get-available-for-adoption'
import { editPet } from './edit'
import { removePet } from './remove'
export async function petRoutes(app: FastifyInstance) {
  app.post('/pets', { onRequest: [verifyJWT] }, createPet)
  app.get('/pets', { onRequest: [verifyJWT] }, getAvailablePetsForAdoption)
  app.put('/pets/:petId', { onRequest: [verifyJWT] }, editPet)
  app.delete('/pets/:petId', { onRequest: [verifyJWT] }, removePet)
}
