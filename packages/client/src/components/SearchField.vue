<template>
  <div class="search-field-container">
    <icon-button
      @on-click="handleBack"
      :class-name="!showBackButton ? 'back-button button-hidden' : 'back-button'"
    >
      <arrow-left-icon />
    </icon-button>
    <input
      :value="searchInput"
      @input="handleChange($event.target.value)"
      class="search-field"
      :placeholder="placeholder"
    />
    <icon-button
      @on-click="handleAdd"
      :class-name="numSelectedPosts > 0 ? 'add-button' : 'add-button add-button-disabled'"
    >
      <file-plus-icon />
    </icon-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useSubreddits } from '@/stores/subreddit.store'
import { usePosts } from '@/stores/post.store'
import ArrowLeftIcon from '@/assets/ArrowLeft.vue'
import FilePlusIcon from '@/assets/FilePlusIcon.vue'
import IconButton from '@/components/IconButton.vue'

export default defineComponent({
  name: 'SearchField',
  setup () {
    const { searchInput: subredditSearchInput } = useSubreddits()
    const { searchInput: postSearchInput, selectedSubreddit, reset, selectedPostMap } = usePosts()

    const searchInput = computed<string>(() => selectedSubreddit.value ? postSearchInput.value : subredditSearchInput.value)
    const placeholder = computed<string>(() => selectedSubreddit.value ? `Search ${selectedSubreddit.value?.display_name}` : 'Search Subreddits')
    const showBackButton = computed<boolean>(() => Boolean(selectedSubreddit.value))
    const numSelectedPosts = computed<number>(() => selectedPostMap.value.size)

    const handleChange = (value: string) => {
      if (selectedSubreddit.value) {
        postSearchInput.value = value
      } else {
        subredditSearchInput.value = value
      }
    }

    const handleBack = () => {
      reset()
    }

    const handleAdd = () => {
      subredditSearchInput.value = ''
      reset()
    }

    return {
      searchInput,
      placeholder,
      showBackButton,
      numSelectedPosts,
      handleChange,
      handleBack,
      handleAdd,
    }
  },
  components: {
    ArrowLeftIcon,
    IconButton,
    FilePlusIcon,
  }
})
</script>

<style scoped lang="scss">
  .search-field-container {
    display: flex;
    align-items: center;
    z-index: 2;
    grid-column: 4 / span 6;
    @include screen-md {
      grid-column: span 12;
    }
  }
  .search-field {
    flex: 1;
    font-size: 3rem;
    width: 100%;
    padding: $spacing-md $spacing-lg;
    border-radius: 40px;
    @include text-field;
    @include screen-sm {
      font-size: 2rem;
    }
  }
  .back-button {
    z-index: 2;
    transition: width 100ms;
    overflow: hidden;
    width: 60px;
    padding: 0;
    svg {
      color: #1f2229;
      height: 3rem;
      width: 3rem;
      @include screen-sm {
        height: 2rem;
        width: 2rem;
      }
    }
  }
  .add-button {
    width: 60px;
    padding: 0;
    svg {
      color: $color-primary;
      height: 3rem;
      width: 3rem;
      @include screen-sm {
        height: 2rem;
        width: 2rem;
      }
    }
  }
  .add-button-disabled {
    svg {
      color: #1f2229;
    }
  }
  .button-hidden {
    width: 0;
  }

</style>
