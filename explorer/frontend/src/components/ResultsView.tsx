import { useState } from 'react'
import type { ContentItem } from '@/types'

interface ResultsViewProps {
  items: ContentItem[]
  raw: unknown
  loading: boolean
  error: string | null
}

export default function ResultsView({ items, raw, loading, error }: ResultsViewProps) {
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

  if (items.length === 0 && !raw) {
    return (
      <div className="text-center py-12 text-gray-400">
        Run a query to see results
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">{items.length} results</span>
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
          {items.map((item, i) => (
            <div key={item.platform_id || i} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  {item.title && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-600 hover:underline line-clamp-2"
                    >
                      {item.title}
                    </a>
                  )}
                  {item.context && (
                    <div className="text-xs text-gray-400 mt-0.5">
                      re: {item.context}
                    </div>
                  )}
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <span className="font-medium">{item.author}</span>
                    <span>·</span>
                    <span>{item.community}</span>
                    <span>·</span>
                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                    {item.score != null && (
                      <>
                        <span>·</span>
                        <span>{item.score} pts</span>
                      </>
                    )}
                    {item.num_comments != null && (
                      <>
                        <span>·</span>
                        <span>{item.num_comments} comments</span>
                      </>
                    )}
                  </div>
                  {item.text && (
                    <p className="mt-2 text-sm text-gray-700 line-clamp-3">
                      {item.text}
                    </p>
                  )}
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
