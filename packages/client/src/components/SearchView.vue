<template>
  <div v-if="isVisible" class="search-view">
    <div class="scroll-view-container">
      <div class="scroll-view" v-bind:class="{ 'scrollView-posts': showPosts }">
        <subreddit-search />
        <post-search />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useSubreddits } from '@/stores/subreddit.store'
import SubredditSearch from '@/components/SubredditSearch.vue'
import PostSearch from '@/components/PostSearch.vue'
import { usePosts } from '@/stores/post.store'
export default defineComponent({
  name: 'SearchView',
  setup () {
    const { searchInput, searchAsync } = useSubreddits()
    const { selectedSubreddit } = usePosts()
    const isVisible = computed<boolean>(() => Boolean(searchInput.value))
    const showPosts = computed<boolean>(() => Boolean(selectedSubreddit.value))

    watch(searchInput, () => {
      searchAsync(searchInput.value)
    })

    return {
      isVisible,
      showPosts,
    }
  },
  components: {
    SubredditSearch,
    PostSearch,
  }
})
</script>

<style scoped lang="scss">
  .search-view {
    @include grid-container;
    background-color: #434954;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 178px $spacing-xxlg 0 $spacing-xxlg;
    @include screen-sm {
      padding: 112px 0 0 0;
    }
  }
  .scroll-view-container {
    grid-column: 4 / span 6;
    overflow: hidden;
    height: 100%;
    @include screen-md {
      grid-column: span 12;
    }
  }
  .scroll-view {
    display: grid;
    grid-template-columns: repeat(2, 100%);
    transition: transform 100ms;
    height: 100%;
  }
  .scrollView-posts {
    transform: translateX(-100%);
  }
  p {
    font-size: 5em;
    color: white;
  }
</style>
