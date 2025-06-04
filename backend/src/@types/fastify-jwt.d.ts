// @types/fastify-jwt.d.ts
import '@fastify/jwt'

interface JwtPayload {
  sub: string
  [key: string]: unknown
}

interface JwtVerifyOptions {
  onlyCookie?: boolean
}

declare module 'fastify' {
  interface FastifyRequest {
    jwtVerify<T = JwtPayload>(options?: JwtVerifyOptions): Promise<T>
    user: {
      sub: string
    }
  }

  interface FastifyReply {
    jwtSign(payload: object, options?: object): Promise<string>
    jwtVerify<T = JwtPayload>(token?: string): Promise<T>
  }
}
