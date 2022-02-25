<template>
  <div>
    <the-navigation />
    <router-view :key="routeName" />
  </div>
</template>

<script>
import '@/assets/styles/index.scss'
import { computed, onMounted } from 'vue'
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
#nav {
  padding: 30px;
}
</style>
