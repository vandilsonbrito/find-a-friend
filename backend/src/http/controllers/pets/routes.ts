import { FastifyInstance } from 'fastify'
import { createPet } from './create'
import { verifyJWT } from '../../../http/middlewares/verify-jwt'
import { getAvailablePetsForAdoption } from './get-available-for-adoption'
import { editPet } from './edit'
import { removePet } from './remove'
import { getOrgPets } from './org-pets'
import { getPet } from './get-pet'
export async function petRoutes(app: FastifyInstance) {
  app.get('/pets', getAvailablePetsForAdoption)
  app.get('/pets/:petId', getPet)

  app.get('/orgs/:orgId/pets', { onRequest: [verifyJWT] }, getOrgPets)
  app.post('/pets', { onRequest: [verifyJWT] }, createPet)
  app.patch('/pets/:petId', { onRequest: [verifyJWT] }, editPet)
  app.delete('/pets/:petId', { onRequest: [verifyJWT] }, removePet)
}
