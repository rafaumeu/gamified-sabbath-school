import { FastifyInstance, FastifyPluginAsync } from 'fastify'

interface LeaderboardEntry {
  rank: number
  id: string
  name: string
  avatar: string | null
  xp: number
  level: number
  streak: number
  achievementsCount: number
}

interface LeaderboardQuerystring {
  limit?: number
  offset?: number
  sortBy?: 'xp' | 'level' | 'streak'
}

interface UserStatsParams {
  id: string
}

const leaderboardRoutes: FastifyPluginAsync = async (fastify) => {
  const prisma = (fastify as any).prisma

  fastify.get<{ Querystring: LeaderboardQuerystring }>(
    '/leaderboard',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            limit: { type: 'number', default: 20, minimum: 1, maximum: 100 },
            offset: { type: 'number', default: 0, minimum: 0 },
            sortBy: { type: 'string', enum: ['xp', 'level', 'streak'], default: 'xp' },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              data: { type: 'array' },
              total: { type: 'number' },
              page: { type: 'number' },
              limit: { type: 'number' },
            },
          },
        },
        description: 'Get the leaderboard rankings',
        tags: ['Leaderboard'],
      },
    },
    async (request, reply) => {
      const { limit = 20, offset = 0, sortBy = 'xp' } = request.query

      const orderBy: Record<string, string> = {}
      orderBy[sortBy] = 'desc'

      const [users, total] = await Promise.all([
        prisma.user.findMany({
          orderBy,
          take: limit,
          skip: offset,
          include: {
            _count: {
              select: { achievements: true },
            },
          },
        }),
        prisma.user.count(),
      ])

      const data: LeaderboardEntry[] = users.map((user: any, index: number) => ({
        rank: offset + index + 1,
        id: user.id,
        name: user.name,
        avatar: user.avatar,
        xp: user.xp,
        level: user.level,
        streak: user.streak,
        achievementsCount: user._count.achievements,
      }))

      return { data, total, page: Math.floor(offset / limit) + 1, limit }
    }
  )

  fastify.get<{ Params: UserStatsParams }>(
    '/leaderboard/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        description: 'Get a specific user ranking and stats',
        tags: ['Leaderboard'],
      },
    },
    async (request, reply) => {
      const { id } = request.params

      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          achievements: { include: { achievement: true } },
          progress: true,
          _count: {
            select: { achievements: true, progress: true },
          },
        },
      })

      if (!user) {
        return reply.status(404).send({ error: 'User not found' })
      }

      const rank = await prisma.user.count({
        where: { xp: { gt: user.xp } },
      })

      return {
        ...user,
        rank: rank + 1,
        achievementsCount: user._count.achievements,
        completedLessons: user._count.progress,
      }
    }
  )

  fastify.get(
    '/leaderboard/stats/summary',
    {
      schema: {
        description: 'Get leaderboard summary statistics',
        tags: ['Leaderboard'],
      },
    },
    async () => {
      const [totalUsers, totalXP, topStreak] = await Promise.all([
        prisma.user.count(),
        prisma.user.aggregate({ _sum: { xp: true } }),
        prisma.user.findFirst({ orderBy: { streak: 'desc' }, select: { name: true, streak: true } }),
      ])

      return {
        totalUsers,
        totalXP: totalXP._sum.xp || 0,
        averageXP: totalUsers > 0 ? Math.round((totalXP._sum.xp || 0) / totalUsers) : 0,
        topStreak,
      }
    }
  )
}

export default leaderboardRoutes
