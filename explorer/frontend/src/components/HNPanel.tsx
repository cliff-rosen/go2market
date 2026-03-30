import { useState } from 'react'
import { searchHN, getTopStories, getNewStories, getBestStories } from '@/lib/api/hnApi'
import ResultsView from './ResultsView'
import type { ContentItem } from '@/types'

export default function HNPanel() {
  const [mode, setMode] = useState<'search' | 'browse'>('search')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('relevance')
  const [timeRange, setTimeRange] = useState('')
  const [tags, setTags] = useState('')
  const [browseList, setBrowseList] = useState<'top' | 'new' | 'best'>('top')
  const [limit, setLimit] = useState(25)

  const [items, setItems] = useState<ContentItem[]>([])
  const [raw, setRaw] = useState<unknown>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSearch() {
    if (!query.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await searchHN({
        q: query,
        sort,
        time_range: timeRange || undefined,
        tags: tags || undefined,
        limit,
      })
      setItems(res.items)
      setRaw(res.raw)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleBrowse() {
    setLoading(true)
    setError(null)
    try {
      const fns = { top: getTopStories, new: getNewStories, best: getBestStories }
      const res = await fns[browseList](limit)
      setItems(res.items)
      setRaw(res)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setMode('search')}
          className={`px-4 py-2 text-sm rounded-lg font-medium ${mode === 'search' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Search (Algolia)
        </button>
        <button
          onClick={() => setMode('browse')}
          className={`px-4 py-2 text-sm rounded-lg font-medium ${mode === 'browse' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Browse Lists
        </button>
      </div>

      {mode === 'search' ? (
        <div className="space-y-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search Hacker News..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          <div className="flex gap-2 items-center flex-wrap">
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
              <option value="relevance">Relevance</option>
              <option value="date">Date</option>
            </select>
            <select value={timeRange} onChange={(e) => setTimeRange(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
              <option value="">All time</option>
              <option value="last_24h">Last 24h</option>
              <option value="past_week">Past week</option>
              <option value="past_month">Past month</option>
            </select>
            <select value={tags} onChange={(e) => setTags(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
              <option value="">All types</option>
              <option value="story">Stories</option>
              <option value="comment">Comments</option>
              <option value="ask_hn">Ask HN</option>
              <option value="show_hn">Show HN</option>
            </select>
            <input
              type="number"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              min={1}
              max={100}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <button
              onClick={handleSearch}
              disabled={loading || !query.trim()}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Fetch
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2 items-center">
          <select value={browseList} onChange={(e) => setBrowseList(e.target.value as 'top' | 'new' | 'best')} className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
            <option value="top">Top Stories</option>
            <option value="new">New Stories</option>
            <option value="best">Best Stories</option>
          </select>
          <input
            type="number"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            min={1}
            max={100}
            className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm"
          />
          <button
            onClick={handleBrowse}
            disabled={loading}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Fetch
          </button>
        </div>
      )}

      <ResultsView items={items} raw={raw} loading={loading} error={error} />
    </div>
  )
}
