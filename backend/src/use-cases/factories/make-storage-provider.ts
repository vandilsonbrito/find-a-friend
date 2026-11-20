import { env } from '@/env'
import { IStorageProviderRepository } from '../../repositories/storage-provider-repository'
import { CloudinaryStorageService } from '../../services/cloudinary-storage'
import { FakeStorageProvider } from '../../services/fake-storage-service'

export function makeStorageProvider(): IStorageProviderRepository {
  if (env.STORAGE_DRIVER === 'fake') {
    return new FakeStorageProvider()
  }

  return new CloudinaryStorageService()
}
