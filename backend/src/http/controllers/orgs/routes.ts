import { FastifyInstance } from 'fastify'
import { register } from './register'
import { refresh } from './refresh'
import { authenticate } from './authenticate'
import { verifyJWT } from '../../../http/middlewares/verify-jwt'
import { orgProfile } from './profile'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/org', register)
  app.post('/authenticate', authenticate)

  app.patch('/token/refresh', refresh)

  /* Authenticated */
  app.get('/me', { onRequest: [verifyJWT] }, orgProfile)
}
