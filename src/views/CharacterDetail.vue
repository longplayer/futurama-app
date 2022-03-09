<template>
  <div
    v-if="isSelectedExist"
    :id="`cid-${id}`"
    class="character-detail"
  >
    <figure class="image">
      <img
        :src="character.images.main"
        :alt="`${character.name.first} ${character.name.last}'s portrait`"
      >
    </figure>
    <div class="content">
      <p>Hello, my name is</p>
      <h1>{{ $filters.getFullName(character.name) }}</h1>
      <p>
        <cite>{{ quote }}</cite>
        <template v-if="character.sayings.length > 1">
          {{ character.sayings.length }}
          <br><button @click.prevent="getNewQuote">
            Get new citation
          </button>
        </template>
      </p>
      <p><strong>Age:</strong> {{ character.age }}</p>
      <p><strong>Gender:</strong> {{ character.gender }}</p>
      <p><strong>Species:</strong> {{ character.species }}</p>
      <p><strong>Occupation:</strong> {{ character.occupation }}</p>
      <p><strong>Home Planet:</strong> {{ character.homePlanet }}</p>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { get } from '@vueuse/core'

export default {
  props: {
    id: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const store = useStore()
    const character = ref(store.getters['characters/getSelected'])
    const isDataFetched = computed(() => store.getters['characters/getCharacters'].length ? true : false)
    const isSelectedExist = computed(() => character.value.length ? true : false)
    const id = computed(() => parseInt(props.id))

    console.log('>> ONCREATE:', `${isDataFetched.value}: [IS data fetched]`)
    console.log('>> ONCREATE:', `${isSelectedExist.value}: [IS selected defined]`)
    console.log('>> Character List Length: ', character.value.length, get(character))

    // const quote = ref(character.value.sayings[0])
    const quote = ref(isSelectedExist.value ? character.value.sayings[0] : null)

    if (!isSelectedExist.value) {
      // 1 check if state has been initited
      // 2 IF-NO: initState and wait...
      // 2 IF-YES: setSelected with props.id
      if(isDataFetched.value)
      {
        character.value = findSelectedfromId(id.value, store.getters['characters/getCharacters'])
        store.dispatch('characters/setSelected', character.value)
      }
      else
      {
        store.dispatch('characters/initState')
          .then(() => {
            character.value = findSelectedfromId(id.value, store.getters['characters/getCharacters'])
            console.log('>>>', id.value, store.getters['characters/getCharacters'])
            console.log('>>> Define SELECTED to', character.value)
            console.log('>>> Is SELECTED exisit now ? ', isSelectedExist.value, character.value.length)
          })
          .catch((error) => {
            console.error('>> API request error:', id.value, error)
          })
      }
    }

    function findSelectedfromId(id, list) {
      return list.filter((data) => data.id === id)[0]
    }

    function getNewQuote() {
      const rand = Math.floor(Math.random() * character.value.sayings.length)
      quote.value = character.value.sayings[rand]
    }

    onMounted(() => {
      if(isSelectedExist.value) {
        quote.value = character.value.sayings[0]
      }
    })

    return {
      character,
      quote,
      isSelectedExist,
      getNewQuote,
    }
  },
}
</script>

<style lang="scss" scoped>
.character-detail {
  border: 1px solid var(--color-primary);
  border-radius: 1rem;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;

  > figure {
    flex: 0 0 auto;
  }

  > div {
    flex: 1 1 60%;
    text-align: left;
  }
}
</style>
