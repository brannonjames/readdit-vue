<template>
  <div class="action-items">
    <button
      class="action-button"
      v-on:click="onClick"
    >
      Download Now
    </button>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
import { usePosts } from "@/stores/post.store";
import { httpPost } from "@/services/http";

export default defineComponent({
  name: 'ActionItems',
  setup() {
    const { selectedPostMap } = usePosts()
    const buttonsAreDisabled = computed(() => selectedPostMap.value.size === 0)

    const onClick = () => {
      console.log(process.env.VUE_APP_API_ENDPOINT)
      httpPost('/restapis/yoxsvpcs8y/local/_user_request_/api', { hello: 'world' })
    }

    return {
      onClick,
      buttonsAreDisabled
    }
  }
})
</script>

<style scoped lang="scss">

.action-items {
  display: flex;
  flex-direction: column;
  align-items: center;
  grid-column: 4 / span 6;
  @include screen-md {
    grid-column: span 12;
  }
}

.action-button {
  width: 50%;
  padding: $spacing-md $spacing-sm;
  font-weight: 700;
}

</style>
