export interface Subreddit {
  community_icon: string
  display_name: string // "nosleep"
  display_name_prefixed: string // "r/nosleep"
  header_title: string
  header_image: string
  icon_img: string
  id: string
  key_color: string
  lang: string
  name: string
  over18: boolean
  primary_color: string
  public_description: string
  public_description_html: string
  subscribers: number
  title: string // "nosleep"
  url: string // "/r/nosleep/"
}

export interface SubredditResponse {
  data?: {
    children?: {
      data: Subreddit
    }[]
  }
}

export interface Post {
  id: string
  subreddit: string
  selftext: string
  selftext_html: string
  author: string
  title: string
  upvote_ratio: number
  ups: number
  score: number
  created_utc: number
  url: string
  is_video: boolean
}

export interface PostResponse {
  data?: {
    children?: {
      data: Post
    }[]
  }
}

export interface RedditSearchParams {
  q?: string
  type: 'sr' | 'user'
  limit?: number
  restrict_sr?: number
  sort: 'relevance' | 'hot' | 'top' | 'new'
  t: 'hour' | 'day' | 'week' | 'month' | 'year' | 'all'
}
