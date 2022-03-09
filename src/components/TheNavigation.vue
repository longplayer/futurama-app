<template>
  <div class="nav">
    <router-link
      to="/"
      class="nav__logo">
      <base-logo 
        height="64px"
        width="64px"
      />
    </router-link>
    <ul class="nav__list">
      <li class="nav__item">
        <router-link :to="{ path: '/characters' }" class="nav__link">
          Characters
        </router-link>
      </li>
      <li class="nav__item">
        <a href="#" class="nav__link">
          Episodes
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import BaseLogo from '@/components/BaseLogo'

export default {
  components: {
    BaseLogo,
  },
  setup() {
    
  },
}
</script>

<style lang="scss" scoped>
.nav {
  display: flex;
  padding: .5rem;
  height: 100%;
  justify-content: space-between;
  align-items: center;

  &__logo {}
  &__list {}
  &__item {
    display: inline-block;
    color: #fff;
  }
  &__link {
    font-weight: 700;
    font-size: 1.5rem;
    letter-spacing: .05rem;
    display: block;
    padding: .25rem .75rem;
  }
}
</style>
