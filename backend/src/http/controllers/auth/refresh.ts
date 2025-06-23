import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  try {
    const refreshToken = request.cookies?.refreshToken

    if (!refreshToken) {
      return reply.status(401).send({ message: 'Refresh token missing.' })
    }

    let decoded: { sub: string }
    try {
      decoded = request.server.jwt.verify<{ sub: string }>(refreshToken)
    } catch (err) {
      return reply.status(401).send({ message: 'Invalid refresh token.' })
    }

    try {
      const newAccessToken = await reply.jwtSign(
        { sub: decoded.sub },
        { expiresIn: '15m' },
      )

      const newRefreshToken = await reply.jwtSign(
        { sub: decoded.sub },
        { expiresIn: '7d' },
      )

      console.log('New tokens generated successfully')

      const isProduction = process.env.NODE_ENV === 'production'

      return reply
        .setCookie('refreshToken', newRefreshToken, {
          path: '/',
          httpOnly: true,
          secure: isProduction,
          sameSite: isProduction ? 'none' : 'lax',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(200)
        .send({
          message: 'Token refreshed successfully.',
          accessToken: newAccessToken,
        })
    } catch (signError) {
      console.log('Error generating new tokens:', signError)
      return reply.status(500).send({ message: 'Error generating tokens' })
    }
  } catch (unexpectedError) {
    console.log('Unexpected error:', unexpectedError)
    return reply.status(500).send({ message: 'Internal server error' })
  }
}
