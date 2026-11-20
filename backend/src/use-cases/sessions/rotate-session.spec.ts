import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryRefreshTokensRepository } from '../../repositories/in-memory/in-memory-refresh-tokens-repository'
import { RotateSessionUseCase } from './rotate-session'
import { InvalidRefreshTokenError } from '../errors/invalid-refresh-token-error'

let refreshTokensRepository: InMemoryRefreshTokensRepository
let sut: RotateSessionUseCase

const NOW = new Date('2026-01-10T12:00:00Z')
const NEXT_WEEK = new Date('2026-01-17T12:00:00Z')

describe('Rotate Session Use Case', () => {
  beforeEach(() => {
    refreshTokensRepository = new InMemoryRefreshTokensRepository()
    sut = new RotateSessionUseCase(refreshTokensRepository)

    vi.useFakeTimers()
    vi.setSystemTime(NOW)
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should mark the current session as replaced and create a new one', async () => {
    const current = await refreshTokensRepository.create({
      orgId: 'org-1',
      expiresAt: NEXT_WEEK,
    })

    const { sessionId } = await sut.execute({
      sessionId: current.id,
      orgId: 'org-1',
    })

    expect(sessionId).not.toBe(current.id)

    const oldSession = await refreshTokensRepository.findById(current.id)
    const newSession = await refreshTokensRepository.findById(sessionId)

    expect(oldSession?.replaced_at).toEqual(NOW)
    expect(oldSession?.revoked_at).toBeNull()
    expect(newSession?.org_id).toBe('org-1')
    expect(newSession?.replaced_at).toBeNull()
    expect(newSession?.revoked_at).toBeNull()
  })

  it('should not rotate a revoked session, even right after revocation', async () => {
    const current = await refreshTokensRepository.create({
      orgId: 'org-1',
      expiresAt: NEXT_WEEK,
    })
    const otherDevice = await refreshTokensRepository.create({
      orgId: 'org-1',
      expiresAt: NEXT_WEEK,
    })
    await refreshTokensRepository.revoke(current.id, NOW) // logout

    vi.setSystemTime(new Date(NOW.getTime() + 1000)) // +1 s

    await expect(() =>
      sut.execute({ sessionId: current.id, orgId: 'org-1' }),
    ).rejects.toBeInstanceOf(InvalidRefreshTokenError)

    // Token de logout reusado não é alarme de roubo: os outros aparelhos seguem.
    const device = await refreshTokensRepository.findById(otherDevice.id)
    expect(device?.revoked_at).toBeNull()
  })

  it('should not rotate a session that does not exist', async () => {
    await expect(() =>
      sut.execute({ sessionId: 'non-existing-id', orgId: 'org-1' }),
    ).rejects.toBeInstanceOf(InvalidRefreshTokenError)
  })

  it('should not rotate a session from another org', async () => {
    const current = await refreshTokensRepository.create({
      orgId: 'org-1',
      expiresAt: NEXT_WEEK,
    })

    await expect(() =>
      sut.execute({ sessionId: current.id, orgId: 'org-2' }),
    ).rejects.toBeInstanceOf(InvalidRefreshTokenError)
  })

  it('should not rotate an expired session', async () => {
    const current = await refreshTokensRepository.create({
      orgId: 'org-1',
      expiresAt: new Date('2026-01-09T12:00:00Z'),
    })

    await expect(() =>
      sut.execute({ sessionId: current.id, orgId: 'org-1' }),
    ).rejects.toBeInstanceOf(InvalidRefreshTokenError)
  })

  it('should accept a session replaced within the reuse interval', async () => {
    const current = await refreshTokensRepository.create({
      orgId: 'org-1',
      expiresAt: NEXT_WEEK,
    })

    await sut.execute({ sessionId: current.id, orgId: 'org-1' })

    vi.setSystemTime(new Date(NOW.getTime() + 29 * 1000)) // +29 s

    const { sessionId } = await sut.execute({
      sessionId: current.id,
      orgId: 'org-1',
    })

    const newSession = await refreshTokensRepository.findById(sessionId)
    expect(newSession?.revoked_at).toBeNull()
  })

  it('should revoke all org sessions when a replaced session is reused after the interval', async () => {
    const stolen = await refreshTokensRepository.create({
      orgId: 'org-1',
      expiresAt: NEXT_WEEK,
    })
    const otherDevice = await refreshTokensRepository.create({
      orgId: 'org-1',
      expiresAt: NEXT_WEEK,
    })
    const otherOrg = await refreshTokensRepository.create({
      orgId: 'org-2',
      expiresAt: NEXT_WEEK,
    })

    // A dona renova normalmente: `stolen` é revogado e nasce `rotated`
    const { sessionId: rotatedId } = await sut.execute({
      sessionId: stolen.id,
      orgId: 'org-1',
    })

    vi.setSystemTime(new Date(NOW.getTime() + 31 * 1000)) // +31 s

    // Alguém aparece com a cópia antiga
    await expect(() =>
      sut.execute({ sessionId: stolen.id, orgId: 'org-1' }),
    ).rejects.toBeInstanceOf(InvalidRefreshTokenError)

    const rotated = await refreshTokensRepository.findById(rotatedId)
    const device = await refreshTokensRepository.findById(otherDevice.id)
    const untouched = await refreshTokensRepository.findById(otherOrg.id)

    expect(rotated?.revoked_at).not.toBeNull()
    expect(device?.revoked_at).not.toBeNull()
    expect(untouched?.revoked_at).toBeNull()

    await expect(() =>
      sut.execute({ sessionId: rotatedId, orgId: 'org-1' }),
    ).rejects.toBeInstanceOf(InvalidRefreshTokenError)
  })
})
