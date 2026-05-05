import Fastify from 'fastify'
import cors from '@fastify/cors'
import swagger from '@fastify/swagger'
import swaggerUi from '@fastify/swagger-ui'
import { PrismaClient } from '@sabbath-school/database'
import leaderboardRoutes from './routes/leaderboard'

const prisma = new PrismaClient()
const app = Fastify({ logger: true })

app.decorate('prisma', prisma)

app.register(cors, { origin: true })

app.register(swagger, {
  swagger: {
    info: {
      title: 'Sabbath School Gamified API',
      description: 'Gamified Sabbath School platform API with leaderboards, achievements, and progress tracking',
      version: '0.1.0',
    },
  },
})

app.register(swaggerUi, { routePrefix: '/docs' })

app.register(leaderboardRoutes, { prefix: '/api' })

app.get('/api/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() }
})

const start = async () => {
  try {
    const port = parseInt(process.env.PORT || '3001', 10)
    await app.listen({ port, host: '0.0.0.0' })
    app.log.info(`Server running on port ${port}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
