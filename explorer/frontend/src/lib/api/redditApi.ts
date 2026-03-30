
import { api } from './index'
import type { ApiResponse } from '@/types'

export interface SubredditInfo {
  name: string
  title: string
  description: string
  subscribers: number
  active_users: number
  created_utc: number
  url: string
  over18: boolean
}

export async function searchSubreddits(params: {
  q: string
  sort?: string
  limit?: number
}): Promise<{ raw: unknown; subreddits: SubredditInfo[]; count: number }> {
  const resp = await api.get('/reddit/subreddits/search', { params })
  return resp.data
}

export async function searchReddit(params: {
  q: string
  subreddit?: string
  sort?: string
  time_filter?: string
  limit?: number
}): Promise<ApiResponse> {
  const resp = await api.get('/reddit/search', { params })
  return resp.data
}

export async function getSubredditNew(
  subreddit: string,
  limit = 25,
): Promise<ApiResponse> {
  const resp = await api.get(`/reddit/subreddit/${subreddit}/new`, {
    params: { limit },
  })
  return resp.data
}

export async function getSubredditHot(
  subreddit: string,
  limit = 25,
): Promise<ApiResponse> {
  const resp = await api.get(`/reddit/subreddit/${subreddit}/hot`, {
    params: { limit },
  })
  return resp.data
}

export async function getComments(
  postId: string,
  subreddit: string,
  limit = 50,
): Promise<{ raw: unknown }> {
  const resp = await api.get(`/reddit/comments/${postId}`, {
    params: { subreddit, limit },
  })
  return resp.data
}
