<template>
  <button class="icon-button" v-on:click="onClick" :class="className">
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IconButton',
  props: {
    className: {
      type: String
    }
  },
  setup(props, context) {
    const onClick = () => {
      context.emit('onClick')
    }

    return {
      onClick
    }
  }
})

</script>

<style scoped lang="scss">
.icon-button {
  appearance: none;
  background: none;
  height: auto;
  width: auto;
  padding: $spacing-sm;
  border: none;
  &:hover { cursor: pointer; }
}
</style>
