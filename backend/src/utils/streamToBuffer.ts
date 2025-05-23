import { Readable } from 'node:stream'

export function streamToBuffer(stream: Readable): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('end', () => {
      const buf = Buffer.concat(chunks)
      resolve(buf)
    })
    stream.on('error', (err) => {
      console.error('Erro ao ler stream:', err)
      reject(err)
    })
  })
}
