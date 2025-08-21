import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    env: {
      apiUrl: 'https://find-a-friend-d1qv.onrender.com',
    },
  },
})
