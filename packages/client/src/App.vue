<template>
  <search-field />
  <search-view />
  <staged-posts />
  <action-items />
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
import SearchField from './components/SearchField.vue'
import SearchView from './components/SearchView.vue'
import StagedPosts from './components/StagedPosts.vue'
import ActionItems from './components/ActionItems.vue'

export default defineComponent({
  name: 'App',
  components: {
    SearchField,
    SearchView,
    StagedPosts,
    ActionItems,
  }
})
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}
#app {
  @include grid-container;
  box-sizing: border-box;
  grid-template-rows: auto 1fr auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  overflow: hidden;
  padding: $spacing-xxlg;
  position: relative;
  background-color: $background-color;
  @include screen-sm {
    padding: $spacing-lg $spacing-md;
  }
}

p {
  margin: 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
