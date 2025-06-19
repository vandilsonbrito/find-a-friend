import { FastifyInstance } from 'fastify'
import { createPet } from './create'
import { verifyJWT } from '../../../http/middlewares/verify-jwt'
import { getAvailablePetsForAdoption } from './get-available-for-adoption'
import { editPet } from './edit'
import { removePet } from './remove'
import { getOrgPets } from './org-pets'
import { getPet } from './get-pet'
import { checkPetOwner } from '@/http/middlewares/check-pet-owner'
import {
  createPetSchema,
  deletePetSchema,
  editPetSchema,
  getAvailablePetsForAdoptionSchema,
  getOrgPetsSchema,
  getPetSchema,
} from '@/docs/swagger/pet-controllers'

export async function petRoutes(app: FastifyInstance) {
  app.get(
    '/pets',
    {
      schema: getAvailablePetsForAdoptionSchema.schema,
    },
    getAvailablePetsForAdoption,
  )
  app.get('/pets/:petId', { schema: getPetSchema.schema }, getPet)

  /* Authenticated */
  app.get(
    '/orgs/:orgId/pets/:page?',
    { schema: getOrgPetsSchema.schema, onRequest: [verifyJWT] },
    getOrgPets,
  )
  app.post(
    '/pets',
    {
      schema: createPetSchema.schema,
      onRequest: [verifyJWT],
    },
    createPet,
  )
  app.patch(
    '/pets/:petId',
    { schema: editPetSchema.schema, onRequest: [verifyJWT, checkPetOwner] },
    editPet,
  )
  app.delete(
    '/pets/:petId',
    { schema: deletePetSchema.schema, onRequest: [verifyJWT, checkPetOwner] },
    removePet,
  )
}
