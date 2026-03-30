import { useState } from 'react'
import RedditPanel from '@/components/RedditPanel'
import HNPanel from '@/components/HNPanel'

const TABS = [
  { id: 'reddit', label: 'Reddit', color: 'text-orange-600' },
  { id: 'hn', label: 'Hacker News', color: 'text-orange-500' },
] as const

type TabId = (typeof TABS)[number]['id']

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('reddit')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-gray-900">
            Community API Explorer
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Explore community APIs to understand what data is available for monitoring
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex gap-6">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? `${tab.color} border-current`
                    : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {activeTab === 'reddit' && <RedditPanel />}
        {activeTab === 'hn' && <HNPanel />}
      </main>
    </div>
  )
}

export default App
