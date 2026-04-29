'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'

interface Match {
  id: string
  scheduled_at: string
  home_team: { name: string }
  away_team: { name: string }
  home_score: number
  away_score: number
  status: string
}

export default function AdminMatchesPage() {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    async function loadMatches() {
      try {
        const { data, error } = await supabase
          .from('matches')
          .select(
            '*, home_team:teams!home_team_id(name), away_team:teams!away_team_id(name)'
          )
          .order('scheduled_at', { ascending: false })

        if (error) throw error
        setMatches(data || [])
      } catch (error) {
        console.error('Error loading matches:', error)
      } finally {
        setLoading(false)
      }
    }

    loadMatches()
  }, [supabase])

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Matches</h1>
        <p>Loading...</p>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Matches</h1>
        <Link
          href="/admin/fixtures/new"
          className="bg-blue-700 text-white px-4 py-2 rounded font-semibold hover:bg-blue-800"
        >
          Schedule New Match
        </Link>
      </div>

      <div className="bg-white text-gray-900 rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="p-4 text-left text-gray-900">Date/Time</th>
              <th className="p-4 text-left text-gray-900">Match</th>
              <th className="p-4 text-center text-gray-900">Score</th>
              <th className="p-4 text-left text-gray-900">Status</th>
              <th className="p-4 text-right text-gray-900">Action</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match) => (
              <tr key={match.id} className="border-b hover:bg-gray-100">
                <td className="p-4 text-sm text-gray-900">
                  {new Date(match.scheduled_at).toLocaleDateString()}{' '}
                  {new Date(match.scheduled_at).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
                <td className="p-4">
                  <div className="font-medium">
                    {match.home_team.name} vs {match.away_team.name}
                  </div>
                </td>
                <td className="p-4 text-center font-bold">
                  {match.status === 'completed' ? (
                    `${match.home_score} - ${match.away_score}`
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      match.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {match.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  {match.status !== 'completed' && (
                    <Link
                      href={`/admin/matches/${match.id}`}
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      Enter Result
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {matches.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No matches found. Create one to get started.
          </div>
        )}
      </div>
    </main>
  )
}
