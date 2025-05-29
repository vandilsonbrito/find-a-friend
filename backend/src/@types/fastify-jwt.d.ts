// @types/fastify-jwt.d.ts
import '@fastify/jwt'

declare module 'fastify' {
  interface FastifyRequest {
    jwtVerify<T = any>(options?: {
      onlyCookie?: boolean
    }): Promise<T>
    user: {
      sub: string
    }
  }

  interface FastifyReply {
    jwtSign(payload: object, options?: object): Promise<string>
    jwtVerify<T = any>(token?: string): Promise<T>
  }
}