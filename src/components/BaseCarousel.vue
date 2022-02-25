<template>
  <Splide :options="options">
    <SplideSlide
      v-for="character in data"
      :key="character.id"
      @click="$emit('selected', character.id)"
    >
      <figure>
        <img
          :src="character.images.main"
          :alt="$filters.getFullName(character.name)"
        >
        <caption>
          {{ getNewQuoteFrom(character) }}
        </caption>
      </figure>
    </SplideSlide>
  </Splide>
</template>

<script>
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'

export default {
  emits: ['selected'],
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    Splide,
    SplideSlide,
  },
  setup() {
    function getNewQuoteFrom(character) {
      const rand = Math.floor(Math.random() * character.sayings.length)
      return character.sayings[rand]
    }

    return {
      getNewQuoteFrom,
    }
  },
}
</script>

<style lang="scss" scoped>

.splide {
  height: 60vh;
  overflow: hidden;
  cursor: pointer;
}

figure {

  img {
    max-height: 100%;
  }

  caption {
    display: inline-block;
    width: 60%;
    margin: 1rem auto;
    font-size: 2.5rem;
    line-height: 3.25rem;
    font-weight: 900;
    font-style: italic;

    &::after,
    &::before {
      content: '"';
      display: inline-block;
    }
  }
}
</style>
