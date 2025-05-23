// @types/fastify-jwt.d.ts
import '@fastify/jwt'

declare module 'fastify' {
  interface FastifyRequest {
    jwtVerify(options?: { onlyCookie?: boolean }): Promise<void>
    org: {
      sub: string
    }
  }

  interface FastifyReply {
    jwtSign(payload: object, options?: object): Promise<string>
  }
}
