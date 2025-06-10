import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: 'src',
    workspace: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: 'src/use-cases',
          // Unit tests don't need database connection typically
          poolOptions: {
            threads: {
              singleThread: false,
            },
          },
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          dir: 'src/http/controllers',
          environment: './prisma/vitest-environment-prisma/prisma-test-environment.ts',
          // E2E tests should run sequentially to avoid database conflicts
          poolOptions: {
            threads: {
              singleThread: true,
            },
          },
          // Add timeout for database setup
          testTimeout: 60000, // 60 seconds
          hookTimeout: 60000, // 60 seconds for setup/teardown
        },
      },
    ],
  },
})