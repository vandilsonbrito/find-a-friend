import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authHeader = request.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return reply.status(401).send({
        message: 'Token missing or invalid format.',
      })
    }

    const token = authHeader.substring(7)

    if (!token) {
      return reply.status(401).send({
        message: 'Token missing.',
      })
    }

    const decoded = await request.jwtVerify<{ sub: string }>()
    request.user = { sub: decoded.sub }
  } catch (err) {
    return reply.status(401).send({
      message: 'Invalid or expired token.',
    })
  }
}

