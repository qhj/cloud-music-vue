<template> 
  <div class="search-div">
    <el-input
      class="search-box"
      placeholder="搜索音乐、歌手、歌词、用户"
      v-model="input"
      clearable
      @keyup.enter="search"
    >
      <template #suffix>
        <i class="el-input__icon el-icon-search" @click="search"></i>
      </template>
    </el-input>
  </div>
  <div class="search-item" v-if="totalSongs === 0">
    <div class="top-search">
      <span>热门搜索</span>
      <hr />
      <el-button
        class="hot"
        round size="mini"
        v-for="(hot, index) in hots"
        :key="hot"
        @click="clickHot(index)"
      >{{hot}}</el-button>
    </div>
    <div class="history-search">
      <div class="history">
        <span>搜索历史</span>
        <i class="el-icon-delete"></i>
      </div>
      <hr />
    </div>
  </div>
  <div class="search-result" v-else>
    <el-tabs v-model="type">
      <el-tab-pane label="单曲" name="singles">
        <single-list :singleList="singles"></single-list>
      </el-tab-pane>
      <el-tab-pane label="歌手" name="singers">歌手</el-tab-pane>
      <el-tab-pane label="专辑" name="albums">专辑</el-tab-pane>
      <el-tab-pane label="MV" name="mv">MV</el-tab-pane>
      <el-tab-pane label="歌单" name="lists">歌单</el-tab-pane>
      <el-tab-pane label="主播电台" name="radios">主播电台</el-tab-pane>
      <el-tab-pane label="用户" name="users">用户</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
  
import { http } from '../services/fetch'
import { HotResponse } from '../types'
import { useSingles } from '../composables/useSingles'
import SingleList from '../components/SingleList.vue'

export default defineComponent({
  components: {
    SingleList
  },
  setup() {
    const type = ref('singles')
    const searchType = <{[key: string]: string}>{
      singles: '1',
      albums: '10',
      singers: '100',
      lists: '1000',
      users: '1002',
      mv: '1004',
      radios: '1009',
    }
    const input = ref('')
    const hots = reactive<string[]>([])
    const history = ref<string[]>([])
    const { singles, totalSongs, loadSingles } = useSingles()
    const clickHot = async (index: number) => {
      input.value = hots[index]
      await loadSingles(input.value, searchType[type.value])
    }
    
    onMounted(async () => {
      const data = await http<HotResponse>('/search/hot')
      data.result.hots.forEach(hot => {
        hots.push(hot.first)
      })
    })
    const search = async () => {
      // const data = await http(`/search?keywords=${input}`)
      await loadSingles(input.value, searchType[type.value])
    }
    return {
      input,
      hots,
      history,
      clickHot,
      singles,
      totalSongs,
      type,
      search
    }
  }
})
</script>

<style scoped>
.search-div {
  padding-top: 15px;
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: #fff;
  
}
.search-item {
  margin-top: 10px;
  display: flex;
}
.search-result :deep(.el-tabs__header) {
  position: sticky;
  top: 55px;
  z-index: 90;
  background-color: #fff;
  padding-top: 10px;
}
.top-search, .history-search {
  margin: 10px;
  flex: 1;
}
div > span {
  color: gray;
  font-size: 0.8rem;
}
.history {
  display: flex;
  justify-content: space-between;
}
/* https://stackoverflow.com/a/6382036 */
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
}

.hot {
  margin: 5px;
}
.search-box :deep(.el-input__suffix-inner) {
  display: flex;
}
.search-box :deep(.el-input__suffix-inner) .el-icon-circle-close {
  order: 1;
}
.search-box :deep(.el-input__suffix-inner) .el-icon-search {
  order: 2;
}
</style>
