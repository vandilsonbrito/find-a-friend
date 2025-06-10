import 'dotenv/config'
import { Environment } from 'vitest/environments'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)
  url.searchParams.set('schema', schema)

  return url.toString()
}

async function waitForDatabase(maxAttempts = 30, delayMs = 1000) {
  for (let i = 1; i <= maxAttempts; i++) {
    try {
      const prisma = new PrismaClient()
      await prisma.$queryRaw`SELECT 1`
      await prisma.$disconnect()
      console.log(`Banco de dados conectado na tentativa ${i}`)
      return true
    } catch (error) {
      console.log(`Tentativa ${i}/${maxAttempts} - Aguardando banco...`)
      if (i === maxAttempts) {
        console.error(
          'Falha ao conectar ao banco após',
          maxAttempts,
          'tentativas',
        )
        throw error
      }
      await new Promise((resolve) => setTimeout(resolve, delayMs))
    }
  }
  return false
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    // Set the database URL with the unique schema
    process.env.DATABASE_URL = databaseURL

    console.log(
      'Database URL:',
      databaseURL.replace(/password=[^&]+/, 'password=***'),
    )

    try {
      // Wait for database to be ready
      await waitForDatabase()

      // Generate Prisma client
      execSync('npx prisma generate', { stdio: 'pipe' })
      console.log('Prisma Client gerado com sucesso')

      // Deploy migrations
      execSync('npx prisma migrate deploy', { stdio: 'pipe' })
      console.log('Migrações aplicadas com sucesso')

      console.log(`Schema "${schema}" criado com sucesso`)
    } catch (error) {
      console.error('Erro ao configurar o ambiente de teste:', error)
      throw error
    }

    return {
      async teardown() {
        try {
          const prisma = new PrismaClient()
          await prisma.$executeRawUnsafe(
            `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
          )
          await prisma.$disconnect()
          console.log(`Schema "${schema}" removido com sucesso`)
        } catch (error) {
          console.error('Erro ao limpar o schema:', error)
        }
      },
    }
  },
}
