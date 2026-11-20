import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryRefreshTokensRepository } from '../../repositories/in-memory/in-memory-refresh-tokens-repository'
import { RevokeSessionUseCase } from './revoke-session'

let refreshTokensRepository: InMemoryRefreshTokensRepository
let sut: RevokeSessionUseCase

const NEXT_WEEK = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

describe('Revoke Session Use Case', () => {
  beforeEach(() => {
    refreshTokensRepository = new InMemoryRefreshTokensRepository()
    sut = new RevokeSessionUseCase(refreshTokensRepository)
  })

  it('should revoke only the current session', async () => {
    const current = await refreshTokensRepository.create({
      orgId: 'org-1',
      expiresAt: NEXT_WEEK,
    })
    const otherDevice = await refreshTokensRepository.create({
      orgId: 'org-1',
      expiresAt: NEXT_WEEK,
    })

    await sut.execute({ sessionId: current.id, orgId: 'org-1' })

    const revoked = await refreshTokensRepository.findById(current.id)
    const stillValid = await refreshTokensRepository.findById(otherDevice.id)

    expect(revoked?.revoked_at).not.toBeNull()
    expect(stillValid?.revoked_at).toBeNull()
  })

  it('should not revoke a session from another org', async () => {
    const otherOrgSession = await refreshTokensRepository.create({
      orgId: 'org-2',
      expiresAt: NEXT_WEEK,
    })

    await sut.execute({ sessionId: otherOrgSession.id, orgId: 'org-1' })

    const session = await refreshTokensRepository.findById(otherOrgSession.id)
    expect(session?.revoked_at).toBeNull()
  })

  it('should not fail when the session does not exist', async () => {
    await expect(
      sut.execute({ sessionId: 'non-existing-id', orgId: 'org-1' }),
    ).resolves.toBeUndefined()
  })
})
