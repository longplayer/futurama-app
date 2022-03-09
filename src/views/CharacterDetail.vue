<template>
  <section
    v-if="isSelectedExist"
    :id="`cid-${id}`"
    class="character"
  >
    <figure class="character__figure">
      <div class="image-wrapper">
        <img
          class="character__image"
          :src="character.images.main"
          :alt="`${character.name.first} ${character.name.last}'s portrait`"
        >
      </div>
      <caption class="character__caption">
        <strong>Age:</strong> {{ character.age }}
        <br><strong>Gender:</strong> {{ character.gender }}
        <br><strong>Species:</strong> {{ character.species }}
        <br><strong>Occupation:</strong> {{ character.occupation }}
        <br><strong>Home Planet:</strong> {{ character.homePlanet }}
      </caption>
    </figure>

    <div class="character__info">
      <h2>Hello, I'm</h2>
      <h1>{{ $filters.getFullName(character.name) }}</h1>
      <h2>Famous quotes:</h2>
      <p
        v-for="(quote, index) in character.sayings"
        :key="index">
        {{ quote }}
      </p>
    </div>
  </section>
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
    const isSelectedExist = ref(() => character.value.length ? true : false)
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

      console.log('>TEST',isSelectedExist.value, character.value)

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
.character {
  border-radius: 1rem;
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-wrap: wrap;

  &__figure {
    flex: 0 0 auto;
    width: auto;
    padding: 1rem;

    .image-wraper {
      background-color: #fff;
      border: 1px solid #000;
      border-radius: 1rem;

      img {
        object-fit: contain;
        width: 80%;
        height: auto;
      }
    }

    caption {
      display: block;
      width: 100%;
      padding-top: 2rem;
      text-align: left;
      line-height: 1.5rem;
    }
  }

  &__info {
    flex: 1 1 auto;
    width: auto;
    p {
      font-weight: 700;
      line-height: 1.6rem;
      &::after,
      &::before {
        content: '"';
        display: inline;
      }
    }
  }

  > figure {
    flex: 0 0 auto;
  }

  > div {
    flex: 1 1 60%;
    text-align: left;
  }
}
</style>
