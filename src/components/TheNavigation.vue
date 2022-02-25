<template>
  <div id="nav">
    <router-link :to="{ path: '/' }"> 
      Home
    </router-link> |
    <router-link :to="{ path: '/characters' }">
      See All Characters
    </router-link>
  </div>
</template>
