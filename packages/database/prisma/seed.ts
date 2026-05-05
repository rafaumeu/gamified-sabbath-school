import { PrismaClient, ProgressStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding database...')

  const users = await Promise.all([
    prisma.user.upsert({ where: { email: 'maria@example.com' }, update: {}, create: { name: 'Maria Santos', email: 'maria@example.com', xp: 2450, level: 12, streak: 15, avatar: 'M' }}),
    prisma.user.upsert({ where: { email: 'joao@example.com' }, update: {}, create: { name: 'Joao Silva', email: 'joao@example.com', xp: 2100, level: 10, streak: 12, avatar: 'J' }}),
    prisma.user.upsert({ where: { email: 'ana@example.com' }, update: {}, create: { name: 'Ana Oliveira', email: 'ana@example.com', xp: 1800, level: 9, streak: 8, avatar: 'A' }}),
    prisma.user.upsert({ where: { email: 'pedro@example.com' }, update: {}, create: { name: 'Pedro Lima', email: 'pedro@example.com', xp: 1550, level: 8, streak: 21, avatar: 'P' }}),
    prisma.user.upsert({ where: { email: 'lucia@example.com' }, update: {}, create: { name: 'Lucia Ferreira', email: 'lucia@example.com', xp: 1200, level: 6, streak: 5, avatar: 'L' }}),
    prisma.user.upsert({ where: { email: 'carlos@example.com' }, update: {}, create: { name: 'Carlos Mendes', email: 'carlos@example.com', xp: 980, level: 5, streak: 3, avatar: 'C' }}),
    prisma.user.upsert({ where: { email: 'beatriz@example.com' }, update: {}, create: { name: 'Beatriz Costa', email: 'beatriz@example.com', xp: 750, level: 4, streak: 7, avatar: 'B' }}),
    prisma.user.upsert({ where: { email: 'rafael@example.com' }, update: {}, create: { name: 'Rafael Souza', email: 'rafael@example.com', xp: 500, level: 3, streak: 1, avatar: 'R' }}),
  ])

  const lesson1 = await prisma.lesson.upsert({ where: { quarter_week: { quarter: 'Q1-2024', week: 1 }}, update: {}, create: { title: 'A Criacao', description: 'O relato da criacao em Genesis', xpReward: 100, order: 1, quarter: 'Q1-2024', week: 1 }})
  const lesson2 = await prisma.lesson.upsert({ where: { quarter_week: { quarter: 'Q1-2024', week: 2 }}, update: {}, create: { title: 'A Queda do Homem', description: 'O pecado e suas consequencias', xpReward: 100, order: 2, quarter: 'Q1-2024', week: 2 }})

  for (const user of users.slice(0, 3)) {
    await prisma.userProgress.upsert({ where: { userId_lessonId: { userId: user.id, lessonId: lesson1.id }}, update: {}, create: { userId: user.id, lessonId: lesson1.id, status: ProgressStatus.COMPLETED, score: 85, completedAt: new Date() }})
    await prisma.userProgress.upsert({ where: { userId_lessonId: { userId: user.id, lessonId: lesson2.id }}, update: {}, create: { userId: user.id, lessonId: lesson2.id, status: ProgressStatus.COMPLETED, score: 90, completedAt: new Date() }})
  }

  console.log('Seeded ' + users.length + ' users, 2 lessons')
}

main().catch((e) => { console.error(e); process.exit(1) }).finally(() => prisma.$disconnect())
