<template>
  <div class="home">
    <h1>Welcome to the Futurama Characters Board</h1>
    <p>
      Please select one of our favorite characters
      <br>Or see our <router-link :to="{ name: 'Characters' }">complete list</router-link>
    </p>
    <div v-if="favorites.length > 0">
      <h1>Favorites</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'

// This will be used to show our favorite character to the landing page
const defaultCharacters = ['fry', 'rodriguez', 'zoidberg']

export default {
  setup() {

    const store = useStore()
    const data = computed(() => store.getters['characters/getCharacters'])
    const favorites = ref([])

    // Initiate application state
    store.dispatch('characters/initState')

    favorites.value = data.value.filter((character) => {
      return defaultCharacters.includes(character.name.last.toLowerCase())
    })

    onMounted(() => {
      console.log(data.value, favorites.value)
    })

    return {
      data,
      favorites,
    }
  }
}
</script>
