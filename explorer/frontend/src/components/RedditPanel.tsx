import { useState } from 'react'
import { searchReddit, getSubredditNew, getSubredditHot, searchSubreddits } from '@/lib/api/redditApi'
import type { SubredditInfo } from '@/lib/api/redditApi'
import ResultsView from './ResultsView'
import type { ContentItem } from '@/types'

function SubredditResults({ subreddits, raw, loading, error }: {
  subreddits: SubredditInfo[]
  raw: unknown
  loading: boolean
  error: string | null
}) {
  const [viewMode, setViewMode] = useState<'formatted' | 'raw'>('formatted')

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12 text-gray-500">
        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        Fetching...
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
        <span className="font-medium">Error:</span> {error}
      </div>
    )
  }

  if (subreddits.length === 0 && !raw) {
    return (
      <div className="text-center py-12 text-gray-400">
        Search for a topic to discover relevant communities
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">{subreddits.length} communities</span>
        <div className="flex gap-1">
          <button
            onClick={() => setViewMode('formatted')}
            className={`px-3 py-1 text-sm rounded ${viewMode === 'formatted' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Formatted
          </button>
          <button
            onClick={() => setViewMode('raw')}
            className={`px-3 py-1 text-sm rounded ${viewMode === 'raw' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Raw JSON
          </button>
        </div>
      </div>

      {viewMode === 'formatted' ? (
        <div className="space-y-3">
          {subreddits.map((sr) => (
            <div key={sr.name} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <a
                    href={sr.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    r/{sr.name}
                  </a>
                  {sr.title && sr.title !== sr.name && (
                    <span className="ml-2 text-sm text-gray-500">{sr.title}</span>
                  )}
                  <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    <span className="font-medium">{sr.subscribers.toLocaleString()} subscribers</span>
                    {sr.active_users > 0 && (
                      <span>{sr.active_users.toLocaleString()} online now</span>
                    )}
                    {sr.over18 && (
                      <span className="text-red-400 font-medium">NSFW</span>
                    )}
                  </div>
                  {sr.description && (
                    <p className="mt-2 text-sm text-gray-700 line-clamp-2">
                      {sr.description}
                    </p>
                  )}
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-semibold text-gray-900">
                    {sr.subscribers >= 1000000
                      ? `${(sr.subscribers / 1000000).toFixed(1)}M`
                      : sr.subscribers >= 1000
                        ? `${(sr.subscribers / 1000).toFixed(0)}K`
                        : sr.subscribers}
                  </div>
                  <div className="text-xs text-gray-400">members</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-xs overflow-auto max-h-[600px]">
          {JSON.stringify(raw, null, 2)}
        </pre>
      )}
    </div>
  )
}

export default function RedditPanel() {
  const [mode, setMode] = useState<'discover' | 'search' | 'browse'>('discover')
  const [query, setQuery] = useState('')
  const [subreddit, setSubreddit] = useState('')
  const [sort, setSort] = useState('relevance')
  const [timeFilter, setTimeFilter] = useState('week')
  const [browseSort, setBrowseSort] = useState<'new' | 'hot'>('new')
  const [discoverSort, setDiscoverSort] = useState('relevance')
  const [limit, setLimit] = useState(25)

  const [items, setItems] = useState<ContentItem[]>([])
  const [subreddits, setSubreddits] = useState<SubredditInfo[]>([])
  const [raw, setRaw] = useState<unknown>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDiscover() {
    if (!query.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await searchSubreddits({ q: query, sort: discoverSort, limit })
      setSubreddits(res.subreddits)
      setRaw(res.raw)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleSearch() {
    if (!query.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await searchReddit({
        q: query,
        subreddit: subreddit || undefined,
        sort,
        time_filter: timeFilter,
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
    if (!subreddit.trim()) return
    setLoading(true)
    setError(null)
    try {
      const fn = browseSort === 'new' ? getSubredditNew : getSubredditHot
      const res = await fn(subreddit, limit)
      setItems(res.items)
      setRaw(res.raw)
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
          onClick={() => setMode('discover')}
          className={`px-4 py-2 text-sm rounded-lg font-medium ${mode === 'discover' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Discover Communities
        </button>
        <button
          onClick={() => setMode('search')}
          className={`px-4 py-2 text-sm rounded-lg font-medium ${mode === 'search' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Search Posts
        </button>
        <button
          onClick={() => setMode('browse')}
          className={`px-4 py-2 text-sm rounded-lg font-medium ${mode === 'browse' ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          Browse Subreddit
        </button>
      </div>

      {mode === 'discover' ? (
        <>
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleDiscover()}
              placeholder="Topic or problem space (e.g. 'data tables', 'spreadsheet alternative')"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <select value={discoverSort} onChange={(e) => setDiscoverSort(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
              <option value="relevance">Relevance</option>
              <option value="activity">Activity</option>
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
              onClick={handleDiscover}
              disabled={loading || !query.trim()}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Discover
            </button>
          </div>
          <SubredditResults subreddits={subreddits} raw={raw} loading={loading} error={error} />
        </>
      ) : mode === 'search' ? (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search query..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <input
              type="text"
              value={subreddit}
              onChange={(e) => setSubreddit(e.target.value)}
              placeholder="Subreddit (optional)"
              className="w-48 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 items-center">
            <select value={sort} onChange={(e) => setSort(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
              <option value="relevance">Relevance</option>
              <option value="hot">Hot</option>
              <option value="top">Top</option>
              <option value="new">New</option>
              <option value="comments">Comments</option>
            </select>
            <select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)} className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
              <option value="hour">Past hour</option>
              <option value="day">Past day</option>
              <option value="week">Past week</option>
              <option value="month">Past month</option>
              <option value="year">Past year</option>
              <option value="all">All time</option>
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
          <ResultsView items={items} raw={raw} loading={loading} error={error} />
        </div>
      ) : (
        <>
          <div className="flex gap-2 items-center">
            <span className="text-sm text-gray-500">r/</span>
            <input
              type="text"
              value={subreddit}
              onChange={(e) => setSubreddit(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleBrowse()}
              placeholder="subreddit name"
              className="w-48 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
            <select value={browseSort} onChange={(e) => setBrowseSort(e.target.value as 'new' | 'hot')} className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white">
              <option value="new">New</option>
              <option value="hot">Hot</option>
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
              disabled={loading || !subreddit.trim()}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Fetch
            </button>
          </div>
          <ResultsView items={items} raw={raw} loading={loading} error={error} />
        </>
      )}
    </div>
  )
}
