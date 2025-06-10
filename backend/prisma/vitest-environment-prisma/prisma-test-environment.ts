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
      // Use db push instead of migrate deploy as it's more reliable for testing
      execSync('npx prisma db push --skip-generate', {
        stdio: 'pipe',
        env: { ...process.env, DATABASE_URL: databaseURL },
      })
      console.log(`Migrações aplicadas com sucesso no schema "${schema}"`)
    } catch (error) {
      console.error('Erro ao configurar o ambiente de teste:', error)
      // Try to create schema manually if db push fails
      try {
        const prisma = new PrismaClient({
          datasources: {
            db: {
              url: databaseURL,
            },
          },
        })

        await prisma.$executeRawUnsafe(
          `CREATE SCHEMA IF NOT EXISTS "${schema}"`,
        )
        await prisma.$disconnect()
        console.log(`Schema "${schema}" criado manualmente`)
      } catch (manualError) {
        console.error('Falha na criação manual do schema:', manualError)
        throw error
      }
    }

    return {
      async teardown() {
        try {
          const prisma = new PrismaClient({
            datasources: {
              db: {
                url: process.env.DATABASE_URL,
              },
            },
          })
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
