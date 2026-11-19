export interface IStorageProviderRepository {
  uploadFile(file: Buffer, key: string): Promise<string>
  deleteFile(fileUrl: string): Promise<void>
}
