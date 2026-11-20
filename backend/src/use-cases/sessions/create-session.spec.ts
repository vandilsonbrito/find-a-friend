import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryRefreshTokensRepository } from '../../repositories/in-memory/in-memory-refresh-tokens-repository'
import { CreateSessionUseCase } from './create-session'
import { REFRESH_TOKEN_TTL_SECONDS } from './session-config'

let refreshTokensRepository: InMemoryRefreshTokensRepository
let sut: CreateSessionUseCase

describe('Create Session Use Case', () => {
  beforeEach(() => {
    refreshTokensRepository = new InMemoryRefreshTokensRepository()
    sut = new CreateSessionUseCase(refreshTokensRepository)

    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-10T12:00:00Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should create a session that expires with the refresh token', async () => {
    const { sessionId } = await sut.execute({ orgId: 'org-1' })

    const session = await refreshTokensRepository.findById(sessionId)

    expect(session?.org_id).toBe('org-1')
    expect(session?.revoked_at).toBeNull()
    expect(session?.expires_at).toEqual(
      new Date(Date.now() + REFRESH_TOKEN_TTL_SECONDS * 1000),
    )
  })

  it('should delete only the expired sessions of the same org', async () => {
    const yesterday = new Date('2026-01-09T12:00:00Z')
    const tomorrow = new Date('2026-01-11T12:00:00Z')

    const expiredOwn = await refreshTokensRepository.create({
      orgId: 'org-1',
      expiresAt: yesterday,
    })
    const validOwn = await refreshTokensRepository.create({
      orgId: 'org-1',
      expiresAt: tomorrow,
    })
    const expiredOther = await refreshTokensRepository.create({
      orgId: 'org-2',
      expiresAt: yesterday,
    })

    await sut.execute({ orgId: 'org-1' })

    const ids = refreshTokensRepository.items.map((item) => item.id)
    expect(ids).not.toContain(expiredOwn.id)
    expect(ids).toContain(validOwn.id)
    expect(ids).toContain(expiredOther.id)
  })
})
