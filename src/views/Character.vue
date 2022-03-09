<template>
  <section class="character-list">
    <h1>Futurama character list</h1>
    <template v-if="isDataFetched">
      <ul>
        <li
          v-for="data in dataStored"
          :key="data.id"
        >
          <button class="card" @click.prevent="openCharacterDetail(data.id)">
            <figure
              class="card__figure"
            >
              <img
                class="card__image"
                :src="data.images.main"
              >
            </figure>
            <div class="card__text">
              <h2>{{ $filters.getFullName(data.name) }}</h2>
              <span class="text-link">
                see details
              </span>
            </div>
          </button>
        </li>
      </ul>
    </template>
  </section>
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
  grid-template-rows: repeat(1, 1fr);
  grid-template-columns: repeat(1, 1fr);
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
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;
  background-color: transparent;
  border: 1px solid var(--color-primary);
  border-radius: 1rem;
  width: 100%;

  &__figure {
    flex: 0 0 100%;
    width: 100%;
    height: 256px;
    padding-top: 1rem;
  }

  &__image {
    transition: transform 250ms ease;
    transform: scale(.8);
    max-width: 100%;
    max-height: 100%;
  }

  &__text {
    height: auto;
    margin: auto;
    padding: 2rem .5rem;
    h2 {
      margin-bottom: .5rem;
    }
    .text-link {
      margin-top: .75rem;
      opacity: 0;
      visibility: hidden;
      transition: opacity 600ms ease 250ms;
      text-decoration: underline;
    }
  }

  &:hover {
    background-color: #FFF;

    .card__image {
      transform: scale(1);
    }
    .text-link {
      opacity: 1;
      visibility: visible;
    }

  }
}

@media screen and (min-width: 760px) {
  ul {
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
