<template>
  <el-table
    :data="singleList"
    stripe
    :show-header="false"
    @row-dblclick="play"
  >
    <el-table-column
      prop="name"
      width="auto">
    </el-table-column>
    <el-table-column
      prop="ar"
      width="180"
    >
      <template #default="props">
        <span v-for="artist in props.row.ar" :key="artist.id">{{artist.name}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="al"
      width="180"
    >
      <template #default="props">
        <span class="album-name">{{props.row.al.name}}</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="dt"
      width="100">
      <template #default="props">
        {{formatTime(props.row.dt)}}
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useEventBus } from '../composables/useEvents'
import { SongMeta } from '../types'
import { formatTime } from '../utils/formatTime'

export default defineComponent({
  props: {
    singleList: {
      type: Object as () => SongMeta[],
      // https://stackoverflow.com/a/64417684
      // https://www.techiediaries.com/vue-3-typescript-component-props-example/
      required: true
    }
  },
  setup() {
    const { bus } = useEventBus()
    const play = async (row: SongMeta) => {
      bus.value.emit('play', row)
    }

    return {
      play,
      formatTime
    }
  }
})
</script>

<style scoped>
.album-name {
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
