/* eslint-disable @typescript-eslint/no-unused-vars */
import { IStorageProviderRepository } from '../repositories/storage-provider-repository'

export class FakeStorageProvider implements IStorageProviderRepository {
  async uploadFile(file: Buffer, filename: string): Promise<string> {
    return 'https://fake-storage.com/fake-image.jpg'
  }

  async deleteFile(fileUrl: string): Promise<void> {}
}
