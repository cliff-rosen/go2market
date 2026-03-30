import { api } from './index'
import type { ApiResponse } from '@/types'

export async function searchHN(params: {
  q: string
  sort?: string
  time_range?: string
  tags?: string
  limit?: number
}): Promise<ApiResponse> {
  const resp = await api.get('/hn/search', { params })
  return resp.data
}

export async function getTopStories(limit = 25): Promise<ApiResponse> {
  const resp = await api.get('/hn/top', { params: { limit } })
  return resp.data
}

export async function getNewStories(limit = 25): Promise<ApiResponse> {
  const resp = await api.get('/hn/new', { params: { limit } })
  return resp.data
}

export async function getBestStories(limit = 25): Promise<ApiResponse> {
  const resp = await api.get('/hn/best', { params: { limit } })
  return resp.data
}

export async function getItem(itemId: number): Promise<{ raw: unknown }> {
  const resp = await api.get(`/hn/item/${itemId}`)
  return resp.data
}
