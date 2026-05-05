'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  LeaderboardTable,
  LeaderboardStats,
  SortToggle,
  type SortField,
} from '@sabbath-school/ui'
import type { LeaderboardEntry } from '@sabbath-school/ui'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

interface LeaderboardResponse {
  data: LeaderboardEntry[]
  total: number
  page: number
  limit: number
}

interface SummaryStats {
  totalUsers: number
  totalXP: number
  averageXP: number
  topStreak: { name: string; streak: number } | null
}

export default function Home() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [stats, setStats] = useState<SummaryStats | null>(null)
  const [sortBy, setSortBy] = useState<SortField>('xp')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const LIMIT = 20

  const fetchLeaderboard = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const offset = (page - 1) * LIMIT
      const res = await fetch(
        `${API_BASE}/leaderboard?limit=${LIMIT}&offset=${offset}&sortBy=${sortBy}`
      )
      if (!res.ok) throw new Error('Failed to fetch leaderboard')
      const json: LeaderboardResponse = await res.json()
      setEntries(json.data)
      setTotalPages(Math.ceil(json.total / LIMIT))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [page, sortBy])

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/leaderboard/stats/summary`)
      if (!res.ok) return
      const json: SummaryStats = await res.json()
      setStats(json)
    } catch {
      // Stats are non-critical, silently fail
    }
  }, [])

  useEffect(() => {
    fetchLeaderboard()
  }, [fetchLeaderboard])

  useEffect(() => {
    fetchStats()
  }, [fetchStats])

  const handleSortChange = (newSort: SortField) => {
    setSortBy(newSort)
    setPage(1) // Reset to first page on sort change
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                🏆 Sabbath School Leaderboard
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Track progress, compete with friends, and grow together
              </p>
            </div>
            <div className="hidden sm:block">
              <SortToggle currentSort={sortBy} onSortChange={handleSortChange} />
            </div>
          </div>
          {/* Mobile sort toggle */}
          <div className="sm:hidden mt-4">
            <SortToggle currentSort={sortBy} onSortChange={handleSortChange} />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        {stats && <LeaderboardStats stats={stats} />}

        {/* Leaderboard */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 md:p-6">
            {error ? (
              <div className="text-center py-12">
                <p className="text-red-500 text-lg mb-2">Failed to load leaderboard</p>
                <p className="text-gray-400 text-sm mb-4">{error}</p>
                <button
                  onClick={fetchLeaderboard}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <LeaderboardTable entries={entries} loading={loading} />
            )}
          </div>

          {/* Pagination */}
          {!error && !loading && totalPages > 1 && (
            <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ← Previous
              </button>
              <span className="text-sm text-gray-500">
                Page {page} of {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
