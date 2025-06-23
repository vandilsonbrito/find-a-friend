import fastify from 'fastify'
import { orgsRoutes } from './http/controllers/orgs/routes'
import { env } from './env'
import { ZodError } from 'zod'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastifyMultipart from '@fastify/multipart'
import { petRoutes } from './http/controllers/pets/routes'
import { PetsNotFoundError } from './use-cases/errors/pet-not-found-error'
import { OrgNotFoundError } from './use-cases/errors/org-not-found-error'
import fastifyRateLimit from '@fastify/rate-limit'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { authRoutes } from './http/controllers/auth/routes'

export const app = fastify()

app.get('/', async () => {
  return 'Server Running'
})
app.register(fastifyCors, {
  origin: (origin, cb) => {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3333',
      'https://meu-site.com',
    ]
    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true)
      return
    }
    cb(new Error('Not allowed by CORS'), false)
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
})

app.register(fastifyRateLimit, {
  max: 100,
  timeWindow: '1 minute',
  errorResponseBuilder: () => {
    return { message: 'Too many requests. Please try again later.' }
  },
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCookie)
app.register(fastifyMultipart, {
  attachFieldsToBody: false,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
})



if (process.env.NODE_ENV !== 'test') {
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Find A Friend API',
        description: 'API documentation for Find A Friend.',
        version: '1.0.0',
      },
      servers: [{ url: 'http://localhost:3333' }],
    },
  })
  
  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'list',
      deepLinking: false,
      tryItOutEnabled: false,
      supportedSubmitMethods: [],
    },
    uiHooks: {
      onRequest: function (request, reply, next) {
        next()
      },
      preHandler: function (request, reply, next) {
        next()
      },
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => {
      return swaggerObject
    },
    transformSpecificationClone: true,
  })
}

app.register(orgsRoutes)
app.register(petRoutes)
app.register(authRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error.validation || error.code === 'FST_ERR_VALIDATION') {
    const issues = error.validation
      ? error.validation.map((err) => ({
          path: err.instancePath.split('/').filter(Boolean),
          message: err.message,
          code: err.keyword,
        }))
      : [{ message: error.message }]

    return reply.status(400).send({
      message: 'Validation error.',
      issues,
    })
  }

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (error instanceof PetsNotFoundError || error instanceof OrgNotFoundError) {
    return reply.status(404).send({ message: error.message })
  }

  if (error.code === 'FST_ERR_CTP_EMPTY_JSON_BODY') {
    return reply.status(400).send({
      message:
        "O corpo da requisição não pode estar vazio quando 'Content-Type' é 'application/json'.",
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
