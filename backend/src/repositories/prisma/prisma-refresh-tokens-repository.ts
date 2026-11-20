import { prisma } from '../../../lib/prisma'
import {
  CreateRefreshTokenInput,
  IRefreshTokensRepository,
} from '../refresh-tokens-repository'

export class PrismaRefreshTokensRepository implements IRefreshTokensRepository {
  async create({ orgId, expiresAt }: CreateRefreshTokenInput) {
    return prisma.refreshToken.create({
      data: { org_id: orgId, expires_at: expiresAt },
    })
  }

  async findById(id: string) {
    return prisma.refreshToken.findUnique({ where: { id } })
  }

  async markAsReplaced(id: string, replacedAt: Date) {
    await prisma.refreshToken.update({
      where: { id },
      data: { replaced_at: replacedAt },
    })
  }

  async revoke(id: string, revokedAt: Date) {
    await prisma.refreshToken.update({
      where: { id },
      data: { revoked_at: revokedAt },
    })
  }

  async revokeAllByOrg(orgId: string, revokedAt: Date) {
    await prisma.refreshToken.updateMany({
      where: { org_id: orgId, revoked_at: null },
      data: { revoked_at: revokedAt },
    })
  }

  async deleteExpiredByOrg(orgId: string, now: Date) {
    await prisma.refreshToken.deleteMany({
      where: { org_id: orgId, expires_at: { lte: now } },
    })
  }
}
