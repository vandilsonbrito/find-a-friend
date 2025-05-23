/* eslint-disable @typescript-eslint/no-unused-vars */
export class FakeStorageProvider {
  async uploadFile(file: Buffer, filename: string): Promise<string> {
    return 'https://fake-storage.com/fake-image.jpg'
  }

  async deleteFile(_fileUrl: string): Promise<void> {}
}
