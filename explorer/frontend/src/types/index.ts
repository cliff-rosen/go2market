export interface ContentItem {
  source: string
  platform_id: string
  url: string
  author: string
  text: string
  title: string | null
  community: string
  timestamp: string
  context: string | null
  score: number | null
  num_comments: number | null
}

export interface ApiResponse {
  raw: unknown
  items: ContentItem[]
  count: number
}
