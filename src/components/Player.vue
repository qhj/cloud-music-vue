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
        <div>
          <span>{{songName}}</span>
          <span class="artists">{{`${artists.length === 0 ? artists : ' - ' + artists}`}}</span>
        </div>
        <div>
          <span>{{currentTime}}</span>
          <span class="duration-time">
            / {{durationTime}}
          </span>
        </div>
      </div>
      <el-slider v-model="progress" :show-tooltip="false" :max="1000" @change="changeProgress"></el-slider>
    </div>
    <!-- <div>
      
    </div> -->
  </div>
  <audio ref="audio" @timeupdate="updateTime" @pause="isPlaying = false" />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'

import { useEventBus } from '../composables/useEvents'
import { useSong } from '../composables/useSong'
import { SongMeta } from '../types'
import { formatTime } from '../utils'

export default defineComponent({
  setup() {
    const audio = ref<HTMLAudioElement>()
    const isPlaying = ref(false)
    const icon = computed(() => isPlaying.value ? 'el-icon-video-pause' : 'el-icon-video-play')
    const { song, loadSong } = useSong()
    const cover = ref('')
    const meta = ref<SongMeta>()
    const currentTime = ref('00:00')
    const progress = ref(0)
    const songName = ref('')
    const artists = ref('')
    const durationTime = computed(() => {
      if (!meta.value) {
        return '00:00'
      }
      return formatTime(meta.value.dt)
    })
    const updateTime = () => {
      if (!audio.value) {
        return '00:00'
      }
      currentTime.value = formatTime(audio.value.currentTime * 1000)
      if (meta.value) {
        progress.value = Math.floor(audio.value.currentTime * 1000 / meta.value.dt * 1000) 
      }
    }
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
      meta.value = songMeta
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
        songName.value = songMeta.name
        artists.value = songMeta.ar.reduce((names, value) => `${names}/${value.name}`.replace(/^\//, ''), '')
        isPlaying.value = true
      }
    }
    onMounted(() => bus.value.on('play', play))
    onUnmounted(() => bus.value.off('play', play))
    const changeProgress = (value: number) => {
      if (audio.value && meta.value) {
        audio.value.currentTime = value / 1000 * meta.value.dt / 1000
      }
    }
    return {
      isPlaying,
      audio,
      icon,
      continueOrPause,
      cover,
      durationTime,
      currentTime,
      updateTime,
      progress,
      songName,
      artists,
      changeProgress
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
.duration-time {
  color: gray;
}
.artists {
  color: gray;
}
</style>
