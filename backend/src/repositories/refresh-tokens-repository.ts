import { RefreshToken } from '@prisma/client'

export interface CreateRefreshTokenInput {
  orgId: string
  expiresAt: Date
}

export interface IRefreshTokensRepository {
  create(data: CreateRefreshTokenInput): Promise<RefreshToken>
  findById(id: string): Promise<RefreshToken | null>
  // Rotação: o token foi trocado por um novo
  markAsReplaced(id: string, replacedAt: Date): Promise<void>
  // Logout: o token não vale mais, sem tolerância
  revoke(id: string, revokedAt: Date): Promise<void>
  // Revoga todos os ainda não revogados da org (detecção de roubo)
  revokeAllByOrg(orgId: string, revokedAt: Date): Promise<void>
  // Apaga os VENCIDOS da org (limpeza no login)
  deleteExpiredByOrg(orgId: string, now: Date): Promise<void>
}
