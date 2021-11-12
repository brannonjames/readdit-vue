import { ref, Ref } from 'vue'
import { Post, Subreddit } from '@readdit/shared'
import { postSearchService } from '@/services/PostSearchService'

export interface PostStore {
  selectedSubreddit: Ref<Subreddit | null>
  searchInput: Ref<string>
  isLoading: Ref<boolean>
  posts: Ref<Post[]>
  selectedPostMap: Ref<Map<string, Post>>

  toggleSelectedPost: (post: Post) => void
  isPostSelected: (id: string) => boolean
  reset: () => void
  searchAsync: () => void
}

const selectedSubreddit = ref<Subreddit | null>(null)
const searchInput = ref<string>('')
const isLoading = ref<boolean>(false)
const posts = ref<Post[]>([])
const selectedPostMap = ref<Map<string, Post>>(new Map<string, Post>())

function reset() {
  selectedSubreddit.value = null
  searchInput.value = ''
}

async function searchAsync(): Promise<void> {
  isLoading.value = true
  const result = await postSearchService.search(
    selectedSubreddit?.value?.title || '',
    { q: searchInput.value }
  )
  isLoading.value = false
  posts.value = result
}

function toggleSelectedPost(post: Post): void {
  if (selectedPostMap.value.has(post.id)) {
    selectedPostMap.value.delete(post.id)
  } else {
    selectedPostMap.value.set(post.id, post)
  }
}

function isPostSelected(id: string): boolean {
  return selectedPostMap.value.has(id)
}

export const usePosts = (): PostStore => ({
  selectedSubreddit,
  searchInput,
  isLoading,
  posts,
  selectedPostMap,
  toggleSelectedPost,
  isPostSelected,
  reset,
  searchAsync,
})
