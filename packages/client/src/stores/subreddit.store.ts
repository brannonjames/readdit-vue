import { ref, Ref } from 'vue'
import { subredditSearchService } from '@/services/SubredditSearchService'
import { Subreddit } from '@readdit/shared'

export interface SubredditStore {
  searchInput: Ref<string>;
  isLoading: Ref<boolean>
  subreddits: Ref<Subreddit[]>

  searchAsync: (query: string) => void
}

const searchInput = ref<string>('')
const isLoading = ref<boolean>(false)
const subreddits = ref<Subreddit[]>([])

async function searchAsync(query: string): Promise<void> {
  isLoading.value = true
  const result = await subredditSearchService.search(query)
  isLoading.value = false
  subreddits.value = result
}

export const useSubreddits = (): SubredditStore => ({
  searchInput,
  isLoading,
  subreddits,
  searchAsync,
})
