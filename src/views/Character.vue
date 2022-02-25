<template>
  <div class="character-list">
    <h1>Futurama character list</h1>
    <template v-if="isDataFetched">
      <ul>
        <li
          v-for="data in dataStored"
          :key="data.id"
        >
          <div class="card">
            <button
              @click.prevent="openCharacterDetail(data.id)"
            >
              <figure class="card__link" href="#">
                <img
                  class="card__image"
                  :src="data.images.main"
                />
              </figure>
              <div class="card__text">
                <p>{{ $filters.getFullName(data.name) }}</p>
                <p>{{ data.age }}</p>
                <p>{{ data.homePlanet }}</p>
                <p>{{ data.occupation }}</p>
                <p>{{ data.species }}</p>
              </div>
            </button>
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>

<script>
import { computed, onMounted, onBeforeUpdate } from '@vue/runtime-core'
import { useStore } from "vuex"
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const dataStored = computed(() => store.getters['characters/getCharacters'])
    const isDataFetched = computed(() => store.getters['characters/getCharacters'].length ? true : false)

    function openCharacterDetail(id) {
      const character = dataStored.value.filter((character) => {
        console.log(character.id, id, character.id === id)
        return character.id === id
      })[0]

      // save selcted to global state
      store.dispatch('characters/setSelected', character)

      // redirection based on the id/slug
      router.push({
        name: 'Character',
        params: { id }
      })
    }

    // Fetch data is storage has been cleared
    if (!isDataFetched.value) {
      store.dispatch('characters/initState')
        .then()
        .catch((error) => {
          console.log(error)
        })
    }


    onMounted(() => {})
    onBeforeUpdate(() => {})

    return {
      isDataFetched,
      dataStored,
      openCharacterDetail,
    }
}
}
</script>

<style scoped lang="scss">

</style>
