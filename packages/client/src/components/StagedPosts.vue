<template>
  <ul class="staged-posts">
    <li
      v-for="post in posts"
      :key="post.id"
      class="post"
    >
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
</template>

<script>
import { defineComponent, computed } from 'vue'
import { usePosts } from '@/stores/post.store'
import ExternalLinkIcon from '@/assets/ExternalLink.vue'
export default defineComponent({
  name: 'StagedPosts',
  setup() {
    const { selectedPostMap } = usePosts()
    const posts = computed(() => selectedPostMap.value.values())
    return {
      posts
    }
  },
  components: {
    ExternalLinkIcon,
  }
})
</script>

<style scoped lang="scss">
$list-item-height: 44px;

.staged-posts {
  grid-column: 4 / span 6;
  @include screen-md {
    grid-column: span 12;
  }
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
