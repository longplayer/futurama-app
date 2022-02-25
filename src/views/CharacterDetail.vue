<template>
  <div
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
        <br><button @click.prevent="getNewQuote">Get new citation</button>
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
      quote.value = character.value.sayings[rand]
    }

    return {
      character,
      quote,
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
