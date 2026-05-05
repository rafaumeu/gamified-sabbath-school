'use client'

import { cn } from '../utils'

export interface LeaderboardEntry {
  rank: number
  name: string
  avatar: string | null
  xp: number
  level: number
  streak: number
  achievementsCount: number
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[]
  loading?: boolean
  currentUserId?: string
}

function getRankDisplay(rank: number): { medal: string; color: string } {
  switch (rank) {
    case 1:
      return { medal: '🥇', color: 'text-yellow-500' }
    case 2:
      return { medal: '🥈', color: 'text-gray-400' }
    case 3:
      return { medal: '🥉', color: 'text-amber-600' }
    default:
      return { medal: `#${rank}`, color: 'text-gray-500' }
  }
}

function getLevelBadgeColor(level: number): string {
  if (level >= 10) return 'bg-purple-100 text-purple-800'
  if (level >= 7) return 'bg-blue-100 text-blue-800'
  if (level >= 4) return 'bg-green-100 text-green-800'
  return 'bg-gray-100 text-gray-800'
}

export function LeaderboardTable({ entries, loading, currentUserId }: LeaderboardTableProps) {
  if (loading) {
    return (
      <div className="w-full space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="animate-pulse flex items-center gap-4 p-4 rounded-lg bg-gray-50">
            <div className="w-8 h-8 bg-gray-200 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/3" />
              <div className="h-3 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No rankings yet</p>
        <p className="text-gray-400 text-sm mt-1">Complete lessons to appear on the leaderboard!</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="hidden md:grid grid-cols-[60px_1fr_100px_80px_80px_80px] gap-2 px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
        <span>Rank</span>
        <span>Student</span>
        <span>XP</span>
        <span>Level</span>
        <span>Streak</span>
        <span>Badges</span>
      </div>
      <div className="divide-y divide-gray-100">
        {entries.map((entry) => {
          const { medal, color } = getRankDisplay(entry.rank)
          const isCurrentUser = entry.rank.toString() === currentUserId

          return (
            <div
              key={entry.rank}
              className={cn(
                'grid grid-cols-[40px_1fr_60px] md:grid-cols-[60px_1fr_100px_80px_80px_80px] gap-2 items-center px-4 py-3 transition-colors hover:bg-gray-50',
                isCurrentUser && 'bg-blue-50 hover:bg-blue-100',
                entry.rank <= 3 && 'bg-amber-50/50'
              )}
            >
              <span className={cn('font-bold text-lg', color)}>
                {medal}
              </span>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                  {entry.avatar || entry.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-gray-900 truncate">{entry.name}</p>
                  <p className="text-xs text-gray-500 md:hidden">
                    Lv.{entry.level} · {entry.xp} XP · 🔥{entry.streak}
                  </p>
                </div>
              </div>
              <div className="hidden md:block">
                <span className="font-semibold text-gray-900">{entry.xp.toLocaleString()}</span>
                <span className="text-xs text-gray-500 ml-1">XP</span>
              </div>
              <div className="hidden md:block">
                <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', getLevelBadgeColor(entry.level))}>
                  Lv. {entry.level}
                </span>
              </div>
              <div className="hidden md:block">
                <span className="text-sm font-medium text-orange-600">🔥 {entry.streak}</span>
              </div>
              <div className="hidden md:block">
                <span className="text-sm text-gray-600">🏆 {entry.achievementsCount}</span>
              </div>
              <div className="text-right md:hidden">
                <span className="font-semibold text-gray-900">{entry.xp.toLocaleString()}</span>
                <span className="text-xs text-gray-500"> XP</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
