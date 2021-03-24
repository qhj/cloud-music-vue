<template>
  <div class="title">发现音乐</div>
  <el-tabs v-model="type">
    <el-tab-pane label="个性推荐" name="recommands">
      <Banner />
    </el-tab-pane>
    <el-tab-pane label="歌单" name="lists">MV</el-tab-pane>
    <el-tab-pane label="主播电台" name="radios">主播电台</el-tab-pane>
    <el-tab-pane label="最新音乐" name="newest">最新音乐</el-tab-pane>
    <el-tab-pane label="歌手" name="singers">歌手</el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import Banner from '../components/Banner.vue'

export default defineComponent({
  components: {
    Banner
  },
  setup() {
    const type = ref('recommands')
    return {
      type
    }
  }
})
</script>
<style scoped>
  .title {
    margin-top: 10px;
    font-size: 0.8rem;
    color: gray;
  }
</style>
