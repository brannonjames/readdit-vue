<template>
  <div class="post-search">
    <ul>
      <li
        v-for="post in posts"
        :key="post.id"
        class="post"
      >
        <icon-button
          v-on:click="toggleSelectedPost(post)"
          :class-name="isPostSelected(post.id) ? 'checkbox checkbox-checked' : 'checkbox'"
        >
          <square-icon v-if="!isPostSelected(post.id)" />
          <plus-square-icon v-else />
        </icon-button>
        <div class="post-content">
          <div class="title-container">
            <p class="title">{{ post.title }}</p>
            <a
              :href="post.url"
              target="_blank"
              class="external-link"
              v-on:click="$event.stopPropagation()"
            >
              <external-link-icon />
            </a>
          </div>
          <p class="body-preview">
            {{ post.selftext.length > 300 ? `${post.selftext.substring(0, 300)}...` : post.selftext }}
          </p>
          <p class="author">
            by {{ post.author }}
          </p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { watch, defineComponent } from 'vue'
import { useSubreddits } from '@/stores/subreddit.store'
import { usePosts } from '@/stores/post.store'
import IconButton from '@/components/IconButton.vue'
import SquareIcon from '@/assets/SquareIcon.vue'
import PlusSquareIcon from '@/assets/PlusSquareIcon.vue'
import ExternalLinkIcon from '@/assets/ExternalLink.vue'

export default defineComponent({
  name: 'PostSearch',
  setup() {
    const { subreddits } = useSubreddits()
    const { selectedSubreddit, searchAsync, posts, searchInput, toggleSelectedPost, isPostSelected } = usePosts()

    watch([selectedSubreddit, searchInput], () => {
      if (selectedSubreddit.value) {
        searchAsync()
      }
    })

    return {
      subreddits,
      posts,
      toggleSelectedPost,
      isPostSelected,
    }
  },
  components: {
    IconButton,
    SquareIcon,
    PlusSquareIcon,
    ExternalLinkIcon,
  }
})
</script>

<style scoped lang="scss">

$list-item-height: 44px;

.post-search {
  padding: 0 $spacing-lg;
  overflow-y: auto;
}

.post {
  @include list-item;
}

.post-content {
  flex: 1;
  color: $grey1;
}

.title-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: $spacing-sm;
  .title {
    @include font-body-bold(1.2rem);
    color: #FFF;
    margin-right: $spacing-sm;
  }
  .external-link {
    @include hoverable;
    color: #FFF;
    svg {
      size: 1rem;
    }
  }
}

.body-preview {
  margin-bottom: $spacing-sm;
}
.author {
  font-weight: 700;
}
.checkbox {
  margin-right: $spacing-sm;
  svg {
    height: 2rem;
    width: 2rem;
    stroke: white;
  }
}
.checkbox-checked {
  svg {
    stroke: $color-primary;
  }
}
</style>
