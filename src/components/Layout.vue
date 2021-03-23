<template>
  <div :class="className">
    <aside>
      <Nav />
    </aside>
    <main>
      <!-- https://stackoverflow.com/a/65760822 -->
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </main>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, provide, readonly, ref } from 'vue'
  import { RouterView } from 'vue-router'

  import Nav from './Nav.vue'
  import { isCollapseKey } from '../types'

  export default defineComponent({
    components: {
      Nav,
      RouterView
    },
    setup() {
      const isCollapse = ref(true)
      const toggle = () => isCollapse.value = !isCollapse.value
      const className = computed(() => isCollapse.value ? 'collapse' : 'unfold')

      provide(isCollapseKey, readonly(isCollapse))
      provide('toggle', toggle)

      return {
        className
      }
    }
  })
</script>

<style scoped>
  .collapse, .unfold {
    display: grid;
    grid-template-areas: 'nav main';
  }
  .collapse {
    grid-template-columns: 64px auto;
  }
  .unfold {
    grid-template-columns: 200px auto;
  }
  aside {
    grid-area: nav;
  }
  main {
    grid-area: main;
    margin: 0 15px 60px;
  }
</style>
