'use client'

export interface LeaderboardSummaryStats {
  totalUsers: number
  totalXP: number
  averageXP: number
  topStreak: {
    name: string
    streak: number
  } | null
}

interface LeaderboardStatsProps {
  stats: LeaderboardSummaryStats
}

function StatCard({ label, value, icon, color }: { label: string; value: string | number; icon: string; color: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 md:p-6">
      <div className="flex items-center gap-3">
        <span className={`text-2xl ${color}`}>{icon}</span>
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-xl md:text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

export function LeaderboardStats({ stats }: LeaderboardStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      <StatCard label="Total Students" value={stats.totalUsers} icon="👥" color="" />
      <StatCard label="Total XP Earned" value={stats.totalXP.toLocaleString()} icon="⭐" color="" />
      <StatCard label="Average XP" value={stats.averageXP.toLocaleString()} icon="📊" color="" />
      <StatCard
        label="Top Streak"
        value={stats.topStreak ? `${stats.topStreak.streak} days` : 'N/A'}
        icon="🔥"
        color=""
      />
    </div>
  )
}
