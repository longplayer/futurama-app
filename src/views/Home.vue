<template>
  <div class="home">
    <p>Welcome to</p>
    <h1>The Futurama Characters Board</h1>
    <div v-if="favorites.length > 0">
      <h2>
        Please select one of our {{ favorites.length }} favorites characters!!
      </h2>
      <base-carousel
        :options="{ rewind: true, pagination: false }"
        :data="favorites"
        @selected="openCharacterDetail"
      />
      <p>Or see the <router-link :to="{ name: 'Characters' }">complete list</router-link></p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import BaseCarousel from '@/components/BaseCarousel.vue'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

// This will be used to show our favorite character to the landing page
const defaultCharacters = ['fry', 'rodriguez', 'zoidberg']

export default {
  components: {
    // Splide,
    // SplideSlide,
    BaseCarousel,
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const dataStored = computed(() => store.getters['characters/getCharacters'])
    const favorites = ref(dataStored.value.filter((character) => {
      return defaultCharacters.includes(character.name.last.toLowerCase())
    }))

    // Initiate application state
    store.dispatch('characters/initState')

    function getNewQuoteFrom(character) {
      const rand = Math.floor(Math.random() * character.sayings.length)
      return character.sayings[rand]
    }

    function openCharacterDetail(id) {
      const character = dataStored.value.filter((character) => character.id === id)[0]

      // save selcted to global state
      store.dispatch('characters/setSelected', character)

      // redirection based on the id/slug
      router.push({
        name: 'Character',
        params: { id }
      })
    }

    return {
      favorites,
      getNewQuoteFrom,
      openCharacterDetail,
    }
  }
}
</script>

<style scoped lang="scss">

</style>
