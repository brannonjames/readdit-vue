<template>
  <div class="subreddit-search">
    <ul>
      <li
        v-for="subreddit in subreddits"
        v-on:click="handleSelect(subreddit)"
        :key="subreddit.id"
        class="subreddit"
        tabindex="1"
      >
        <div class="title">
          {{ subreddit.display_name }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { useSubreddits } from '@/stores/subreddit.store'
import { usePosts } from '@/stores/post.store'
import { watch, defineComponent } from 'vue'
import { postSearchService } from '@/services/PostSearchService'

export default defineComponent({
  name: 'SubredditSearch',
  setup() {
    const { searchInput, searchAsync, subreddits } = useSubreddits()
    const { selectedSubreddit } = usePosts()

    watch(searchInput, () => {
      searchAsync(searchInput.value)
    })

    const handleSelect = (subreddit) => {
      selectedSubreddit.value = subreddit
      postSearchService.search(subreddit.title)
    }

    return {
      subreddits,
      handleSelect
    }
  }
})
</script>

<style scoped lang="scss">

  $list-item-height: 44px;

  .subreddit-search {
    overflow-y: auto;
    padding: 0 $spacing-lg;
  }

  .subreddit {
    @include list-item;
  }
  .title {
    @include font-body-bold(1.4rem)
  }
</style>
