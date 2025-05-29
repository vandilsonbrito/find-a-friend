import { FastifyInstance } from 'fastify'
import { register } from './register'
import { refresh } from './refresh'
import { authenticate } from './authenticate'
import { verifyJWT } from '../../../http/middlewares/verify-jwt'
import { orgProfile } from './profile'
import { logout } from './logout'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)

  app.get('/me', { onRequest: [verifyJWT] }, orgProfile)
  app.post('/logout', { onRequest: [verifyJWT] }, logout)
}
