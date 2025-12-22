import { defineConfig } from '@prisma/client/config'

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL || 'file:./dev.db'
  }
})
