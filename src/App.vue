<template>
  <HelloWorld msg="网易云音乐 听见好时光" />
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import HelloWorld from './components/HelloWorld.vue'
  
  export default defineComponent({
    name: 'App',
    components: {
      HelloWorld
    }
  })
</script>

<style>
  
</style>
