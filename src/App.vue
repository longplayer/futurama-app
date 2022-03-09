<template>
  <div class="app__inner">
    <header>
      <the-navigation />
    </header>
    <router-view :key="routeName" />
  </div>
</template>

<script>
import '@/assets/styles/index.scss'
import { computed } from 'vue'
import { useRoute  } from 'vue-router'
import TheNavigation from './components/TheNavigation.vue'
export default {
  components: { TheNavigation },
  setup() {
    const route = useRoute()
    const routeName = computed(() => route.name?.toLowerCase())
    return { routeName }
  },
}
</script>

<style lang="scss">
#app {
  padding: 0;
}

.app__inner {
  & header {
    width: 100%;
    height: 6rem;
    color: #fff;
    margin: auto;
    background-color: var(--color-primary-dark);
  }

  & section {
    margin: auto;
    padding: 4rem 1.5rem 2rem;
    width: 100%;
    max-width: 960px;
  }
}
#nav {
  padding: 30px;
}
</style>
