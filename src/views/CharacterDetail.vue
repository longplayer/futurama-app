<template>
  <div
    id=""
    class="character-detail"
  >
    <div>
      <figure>
        <img
          :src="character.images.main"
          :alt="`${character.name.first} ${character.name.last}'s portrait`">
        </figure>
      <div>
        <p>Hello, my name is</p>
        <h1>{{ $filters.getFullName(character.name) }}</h1>
        <p>
          <cite>{{ quote }}</cite>
          <br><button @click.prevent="getNewQuote">Get new citation</button>
        </p>
        <p><strong>Age:</strong> {{ character.age }}</p>
        <p><strong>Gender:</strong> {{ character.gender }}</p>
        <p><strong>Species:</strong> {{ character.species }}</p>
        <p><strong>Occupation:</strong> {{ character.occupation }}</p>
        <p><strong>Home Planet:</strong> {{ character.homePlanet }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
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
    const isSelectedExist = character.value.id ? true : false
    const id = computed(() => parseInt(props.id))
    const quote = ref(character.value.sayings[0])

    // console.log('>is char selected ? ', isSelectedExist ? 'yep' : 'nope')

    if (!isSelectedExist) {
      // 1 check if state has been initited
      // 2 IF-NO: initState and wait...
      // 2 IF-YES: setSelected with props.id
      if(isDataFetched.value) {
        character.value = store.getters['characters/getCharacters']
          .filter((data) => data.id === id.value)[0]

        store.dispatch('characters/setSelected', character.value)
      }
    }

    function getNewQuote() {
      const rand = Math.floor(Math.random() * character.value.sayings.length)
      console.log(rand, character.value.sayings[rand])
      quote.value = character.value.sayings[rand]
    }

    // test function
    function clearSelected() {
      store.dispatch('characters/setSelected', {})
    }

    return {
      character,
      quote,
      clearSelected,
      getNewQuote,
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
