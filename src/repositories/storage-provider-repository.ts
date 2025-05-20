export interface IStorageProviderRepository {
  uploadFile(file: Buffer, filename: string): Promise<string>
  deleteFile(fileUrl: string): Promise<void>
}
