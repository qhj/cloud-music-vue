<template>
  <div class="player">
    <div class="cover">
      <img :src="cover" alt="封面" />
    </div>
    <div class="control">
      <el-button size="mini" icon="el-icon-caret-left" circle></el-button>
      <el-button size="medium" :icon="icon" circle @click="continueOrPause"></el-button>
      <el-button size="mini" icon="el-icon-caret-right" circle></el-button>
    </div>
    <div class="middle">
      <div class="state">
        <span>歌名</span>
        <span>进度</span>
      </div>
      <el-slider v-model="value" :show-tooltip="false"></el-slider>
    </div>
    <!-- <div>
      
    </div> -->
  </div>
  <audio ref="audio" />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'
import { useEventBus } from '../composables/useEvents'

import { useSong } from '../composables/useSong'
import { SongMeta } from '../types'

export default defineComponent({
  setup() {
    const audio = ref<HTMLAudioElement>()
    const isPlaying = ref(false)
    const icon = computed(() => isPlaying.value ? 'el-icon-video-pause' : 'el-icon-video-play')
    const { song, loadSong } = useSong()
    const cover = ref('')
    const { bus } = useEventBus()
    const continueOrPause = () => {
      if (!audio.value) {
        return
      }
      if (isPlaying.value) {
        audio.value.pause()
        isPlaying.value = false
      } else {
        audio.value.play()
        isPlaying.value = true
      }
    }
    const play = async (songMeta: SongMeta) => {
      if (!audio.value) {
        return
      }
      if (isPlaying.value) {
        audio.value.pause()
        isPlaying.value = false
      }
      await loadSong(songMeta)
      if (song.value) {
        audio.value.src = song.value.url
        audio.value.play()
        cover.value = songMeta.al.picUrl + '?param=56y56'
        isPlaying.value = true
      }
    }
    onMounted(() => bus.value.on('play', play))
    onUnmounted(() => bus.value.off('play', play))
    const value = ref(0)
    return {
      isPlaying,
      audio,
      icon,
      continueOrPause,
      cover,
      value
    }
  }
})
</script>

<style scoped>
.player {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  height: 56px;
}
.cover {
  width: 56px;
  height: 56px;
  background-color: #fff;
}
img {
  width: 100%;
  height: 100%;
}
.control {
  margin-top: 10px;
  margin-left: 10px;
}
.middle {
  margin: 0 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.state {
  font-size: 0.75rem;
  margin-top: 7px;
  display: flex;
  justify-content: space-between;
}
.el-slider :deep(.el-slider__button) {
  width: 15px;
  height: 15px;
}
.el-slider :deep(.el-slider__runway), .el-slider :deep(.el-slider__bar) {
  height: 3px;
}
</style>
