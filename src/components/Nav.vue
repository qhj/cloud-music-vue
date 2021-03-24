<template>
  <nav>
    <el-menu :default-active="route.path" class="vertical-menu" @open="handleOpen" @close="handleClose" :collapse="isCollapse" :router="true" :collapse-transition="false">
      <el-menu-item @click="toggle">
        <i :class="icon"></i>
      </el-menu-item>
      <el-menu-item v-for="item in list" :key="item.index" :index="item.index">
        <i :class="item.icon"></i>
        <template #title>{{ item.text }}</template>
      </el-menu-item>
      <el-menu-item>
        <i class="el-icon-d-arrow-right"></i>
      </el-menu-item>
    </el-menu>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { useRoute } from 'vue-router'
import { useInjection } from '../composables/useInjection'
import { isCollapseKey } from '../types'

export default defineComponent({
  setup() {
    const route = useRoute()
    const toggle = inject('toggle')
    const list = [
      { index: '/search', icon: 'el-icon-search', text: '搜索', route: { path: '/search'} },
      { index: '/', icon: 'el-icon-eleme', text: '发现', route: { path: '/'} },
      { index: '4', icon: 'el-icon-video-play', text: 'MV' },
      { index: '5', icon: 'el-icon-user', text: '朋友' },
    ]
    const isCollapse = useInjection(isCollapseKey)
    const icon = computed(() => isCollapse.value ? 'el-icon-s-fold' : 'el-icon-s-unfold')
    const handleOpen = (key: string, keyPath: string) => {
      console.log(key, keyPath);
    }
    const handleClose = (key: string, keyPath: string) => {
      console.log(key, keyPath);
    }

    return {
      list,
      isCollapse,
      icon,
      toggle,
      handleOpen,
      handleClose,
      route
    }
  }
})
</script>

<style scoped>
  nav {
    position: fixed;
    top: 0;
    bottom: 64px;
  }
  .vertical-menu:not(.el-menu--collapse) {
    width: 200px;
  }
  .el-menu--collapse {
    width: 48px;
  }
  .el-menu {
    height: 100%;
  }
  .is-active {
    background-color: #dddde1;
    border-left: solid 3px #903c3e;
  }
  .el-menu-item {
    padding: 0 10px !important;
    height: 48px;
    display: flex !important;
    align-items: center;
  }
  .el-menu-item :deep(div) {
    padding: 0 10px !important;
    display: flex !important;
    align-items: center;
  }
</style>
