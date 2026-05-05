'use client'

import { cn } from '../utils'

export type SortField = 'xp' | 'level' | 'streak'

interface SortToggleProps {
  currentSort: SortField
  onSortChange: (sort: SortField) => void
}

const sortOptions: { value: SortField; label: string; icon: string }[] = [
  { value: 'xp', label: 'XP', icon: '⭐' },
  { value: 'level', label: 'Level', icon: '📈' },
  { value: 'streak', label: 'Streak', icon: '🔥' },
]

export function SortToggle({ currentSort, onSortChange }: SortToggleProps) {
  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      <span className="text-xs text-gray-500 px-2">Sort by:</span>
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => onSortChange(option.value)}
          className={cn(
            'px-3 py-1.5 rounded-md text-sm font-medium transition-all',
            currentSort === option.value
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          {option.icon} {option.label}
        </button>
      ))}
    </div>
  )
}
