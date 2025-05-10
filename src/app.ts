import fastify from 'fastify'
import { orgsRoutes } from './http/controllers/orgs/routes'
import { env } from './env'
import { ZodError } from 'zod'

export const app = fastify()

app.register(orgsRoutes)

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
