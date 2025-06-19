import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../../http/middlewares/verify-jwt'
import { authenticate } from './authenticate'
import { refresh } from './refresh'
import { logout } from './logout'
import {
  registerOrgSchema,
  loginOrgSchema,
  refreshSchema,
  logoutSchema,
} from '@/docs/swagger/auth-controllers'
import { register } from './register'

export async function authRoutes(app: FastifyInstance) {
  app.post('/orgs', { schema: registerOrgSchema.schema }, register)
  app.post('/sessions', { schema: loginOrgSchema.schema }, authenticate)
  app.patch('/token/refresh', { schema: refreshSchema.schema }, refresh)
  app.post(
    '/logout',
    { schema: logoutSchema.schema, onRequest: [verifyJWT] },
    logout,
  )
}
