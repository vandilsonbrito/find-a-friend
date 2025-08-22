import { defineConfig } from 'cypress'

// Altere a forma de exportar para o padrão CommonJS
module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    env: {
      apiUrl: 'https://find-a-friend-d1qv.onrender.com',
    },
  },
})