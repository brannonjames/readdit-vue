import { RedditSearchParams, Subreddit, SubredditResponse } from '@readdit/shared'
import { httpGet } from '@/services/http'

class SubredditSearchService {
  private BASE_URL = 'https://www.reddit.com/search/.json'
  private DEFAULT_PARAMS: Partial<RedditSearchParams> = { limit: 5, type: 'sr' }

  async search(q: string): Promise<Subreddit[]> {
    const response = await httpGet<SubredditResponse>(this.BASE_URL, { ...this.DEFAULT_PARAMS, q })
    console.log(response)
    return response?.data?.children?.map((child) => child.data) || []
  }
}

export const subredditSearchService = new SubredditSearchService()

// https://www.reddit.com/r/nosleep/search.json?q=haunted&restrict_sr=1&limit=5
// https://www.reddit.com/search/.json?q=nosleep&type=sr&limit=5
