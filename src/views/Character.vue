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
              <figure
                class="card__link"
                href="#"
              >
                <img
                  class="card__image"
                  :src="data.images.main"
                >
              </figure>
              <div class="card__text">
                <h2>{{ $filters.getFullName(data.name) }}</h2>
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
import { computed } from '@vue/runtime-core'
import { useStore } from "vuex"
import { useRouter } from 'vue-router'
export default {
  setup() {
    const router = useRouter()
    const store = useStore()
    const dataStored = computed(() => store.getters['characters/getCharacters'])
    const isDataFetched = computed(() => store.getters['characters/getCharacters'].length ? true : false)

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

    // Fetch data is storage has been cleared
    if (!isDataFetched.value) {
      store.dispatch('characters/initState')
        .then()
        .catch((error) => {
          console.log(error)
        })
    }

    return {
      isDataFetched,
      dataStored,
      openCharacterDetail,
    }
  }
}
</script>

<style scoped lang="scss">
ul {
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  gap: .5rem;
  list-style-type: none;
  max-width: 100%;
  
  li {
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}

.card {
  display: flex;
  justify-content: center;
  height: 100%;
  background-color: var(--color-primary);
  padding: 1rem;
  width: 100%;
  img {
    transition: transform 250ms ease;
    transform: scale(.8);
  }


  &:hover {
    background-color: var(--color-secondary);
    button {
      color: #FFF;

      img {
        transform: scale(1);
      }
    }
  }

  button {
    cursor: pointer;
    height: 100%;
    margin: auto 0;
    background-color: transparent;
    border: 0 none;

  }
}
</style>
