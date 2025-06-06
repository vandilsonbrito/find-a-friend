import { FastifyInstance } from 'fastify'
import { register } from './register'
import { refresh } from './refresh'
import { authenticate } from './authenticate'
import { verifyJWT } from '../../../http/middlewares/verify-jwt'
import { orgProfile } from './profile'
import { logout } from './logout'
import { editOrg } from './edit'
import { allOrgs } from './get-all'
import { getOrg } from './get-org'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/orgs', register)
  app.post('/sessions', authenticate)
  app.patch('/token/refresh', refresh)
  app.get('/orgs', allOrgs)
  app.get('/orgs/:orgId', getOrg)

  app.get('/me', { onRequest: [verifyJWT] }, orgProfile)
  app.patch('/orgs/:orgId/profile', { onRequest: [verifyJWT] }, editOrg)
  app.post('/logout', { onRequest: [verifyJWT] }, logout)
}
