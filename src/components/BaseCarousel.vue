<template>
  <Splide :options="options">
    <SplideSlide
      v-for="(character, index) in data"
      :key="character.id"
    >
      <figure>
        <img
          :src="character.images.main"
          :alt="$filters.getFullName(character.name)"
        >
        <caption>
          <a class="quote__link" @click.prevent="$emit('selected', character.id)">
            More information...
          </a>
          <span class="quote__text heading">
            {{ quotes[index] }}
          </span>
          <template v-if="character.sayings.length > 1">
            <button class="quote__refresh" @click.prevent="setNewQuoteToIndex(index, character.sayings)">
              Get new quote
            </button>
          </template>
        </caption>
      </figure>
    </SplideSlide>
  </Splide>
</template>

<script>
import { ref } from '@vue/runtime-core'
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
  setup(props) {

    const quotes = ref([])
    for(const character in props.data) {
      quotes.value.push(getNewQuoteFrom(props.data[character]))
    }

    function getNewQuoteFrom(character) {
      const rand = Math.floor(Math.random() * character.sayings.length)
      return character.sayings[rand]
    }

    function setNewQuoteToIndex(index, characterQuotes) {
      quotes.value[index] = getNewQuoteFrom({sayings: characterQuotes})
    }

    return {
      quotes,
      getNewQuoteFrom,
      setNewQuoteToIndex,
    }
  },
}
</script>

<style lang="scss">

.splide {
  height: auto;
  overflow: hidden;
  cursor: pointer;

  &__track {
    height: 100%;
  }

  &__slide {

    figure {
      display: flex;
      flex-wrap: wrap;
      height: 100%;

      img {
        flex: 0 0 auto;
        width: auto;
        height: auto;
        margin: auto;
        max-height: 100%;
        margin-right: 4rem;
      }
    
      caption {
        position: relative;
        flex: 1 1 60%;
        display: block;
        width: 60%;
        margin: auto;
        padding: 2rem 4rem 2rem 2rem;
        text-align: center;
        background-color: #fff;

        &::before {
          content: '';
          display: block;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate(-50%, -50%) rotate(45deg);
          width: 2rem;
          height: 2rem;
          z-index: 2;
          background-color: #fff;
        }

        .quote__link {
          text-decoration: underline;
        }
        .quote__refresh {
          background-color: tomato;
          color: #fff;
          height: 4rem;
          padding: .25rem 2rem;
          border-radius: 1rem;
          letter-spacing: .1rem;
          text-transform: uppercase;
        }

        .quote__text {
          display: block;
          font-size: 3rem;
          line-height: 3.75rem;
          font-weight: 900;
          margin: 2rem auto;
          letter-spacing: .15rem;

          &::after,
          &::before {
            content: '"';
            display: inline;
          }
        }
      }
    }
  }

}

</style>
