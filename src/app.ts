import fastify from 'fastify'
import { orgsRoutes } from './http/controllers/orgs/routes'
import { env } from './env'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastifyMultipart from '@fastify/multipart'
import { petRoutes } from './http/controllers/pets/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
})

app.register(fastifyCookie)
app.register(fastifyMultipart, {
  attachFieldsToBody: false,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
})

app.register(orgsRoutes)
app.register(petRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }
})
