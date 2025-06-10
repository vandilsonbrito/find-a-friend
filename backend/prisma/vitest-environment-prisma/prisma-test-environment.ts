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
      // Generate Prisma client
      execSync('npx prisma generate', { stdio: 'inherit' })

      // Deploy migrations
      execSync('npx prisma migrate deploy', { stdio: 'inherit' })

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
