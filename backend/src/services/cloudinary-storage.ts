import { v2 as cloudinary } from 'cloudinary'
import { Readable } from 'stream'
import { IStorageProviderRepository } from '../../../repositories/storage-provider-repository'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export class CloudinaryStorageService implements IStorageProviderRepository {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async deleteFile(fileUrl: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async uploadFile(file: Buffer, filename: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          public_id: filename,
          folder: 'pet-uploads',
        },
        (error, result) => {
          if (error) {
            console.error('Erro do Cloudinary:', error)
            return reject(error)
          }

          if (!result || !result.secure_url) {
            console.error('Error on upload to Cloudinary: ', result)
            return reject(new Error('Error on upload to Cloudinary'))
          }

          return resolve(result.secure_url)
        },
      )

      const readable = new Readable()
      readable.push(file)
      readable.push(null)
      readable.pipe(uploadStream)
    })
  }
}
