<template>
  <div class="home">
    <p>Welcome to</p>
    <h1>The Futurama Characters Board</h1>
    <div v-if="favorites.length > 0">
      <h2>
        Discover {{ favorites.length }} new characters!!
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

export default {
  components: {
    BaseCarousel,
  },
  setup() {
    const router = useRouter()
    const store = useStore()
    const dataStored = computed(() => store.getters['characters/getCharacters'])
    const favorites = computed(() => getRandomCharacters())

    // Initiate application state
    store.dispatch('characters/initState')

    function getRandomCharacters(limit = 3) {
      const indexList = setRadomIndexList(limit)
      return dataStored.value.filter((character, index) => {
        return indexList.includes(index)
      })
    }

    function setRadomIndexList(limit) {
      const list = []
      const getRandomIndex = () => Math.floor(Math.random() * dataStored.value.length)
      for(let i = 0; i < limit; i++) {
        let randomIndex = getRandomIndex()
        // generate new randomIndex until it's not include in the array
        while (list.includes(randomIndex)) { randomIndex = getRandomIndex() }
        list[i] = randomIndex
      }
      return list
    }

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
