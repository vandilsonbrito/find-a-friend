import { RefreshToken } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import {
  CreateRefreshTokenInput,
  IRefreshTokensRepository,
} from '../refresh-tokens-repository'

export class InMemoryRefreshTokensRepository
  implements IRefreshTokensRepository
{
  public items: RefreshToken[] = []

  async create({ orgId, expiresAt }: CreateRefreshTokenInput) {
    const refreshToken: RefreshToken = {
      id: randomUUID(),
      org_id: orgId,
      expires_at: expiresAt,
      replaced_at: null,
      revoked_at: null,
      created_at: new Date(),
    }

    this.items.push(refreshToken)

    return refreshToken
  }

  async findById(id: string) {
    return this.items.find((item) => item.id === id) ?? null
  }

  async markAsReplaced(id: string, replacedAt: Date) {
    const refreshToken = this.items.find((item) => item.id === id)

    if (refreshToken) {
      refreshToken.replaced_at = replacedAt
    }
  }

  async revoke(id: string, revokedAt: Date) {
    const refreshToken = this.items.find((item) => item.id === id)

    if (refreshToken) {
      refreshToken.revoked_at = revokedAt
    }
  }

  async revokeAllByOrg(orgId: string, revokedAt: Date) {
    for (const item of this.items) {
      if (item.org_id === orgId && item.revoked_at === null) {
        item.revoked_at = revokedAt
      }
    }
  }

  async deleteExpiredByOrg(orgId: string, now: Date) {
    this.items = this.items.filter(
      (item) => !(item.org_id === orgId && item.expires_at <= now),
    )
  }
}
