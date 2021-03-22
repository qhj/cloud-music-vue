<template>
  <Layout />
  <Player />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  import Layout from './components/Layout.vue'
  import Player from './components/Player.vue'
  
  export default defineComponent({
    name: 'App',
    components: {
      Layout,
      Player
    }
  })
</script>

<style>
  
</style>
