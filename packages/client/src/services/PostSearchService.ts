import { httpGet } from '@/services/http'
import { Post, PostResponse, RedditSearchParams } from '@readdit/shared'

class PostSearchService {
  private BASE_QUERY_URL = (subreddit: string) => `https://www.reddit.com/r/${subreddit}/search.json`
  private BASE_URL = (subreddit: string, sortBy: string) => `https://www.reddit.com/r/${subreddit}/${sortBy}.json`
  private DEFAULT_PARAMS: Partial<RedditSearchParams> = { limit: 10, restrict_sr: 1, sort: 'hot' }

  async search(subreddit: string, params: Partial<RedditSearchParams> = {}): Promise<Post[]> {
    const url = params.q ? this.BASE_QUERY_URL(subreddit) : this.BASE_URL(subreddit, params.sort || 'hot')
    const response = await httpGet<PostResponse>(url, { ...this.DEFAULT_PARAMS, ...params })
    return response?.data?.children?.map((child) => child.data) || []
  }
}

export const postSearchService = new PostSearchService()
