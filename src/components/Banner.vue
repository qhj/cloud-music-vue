<template>
  <div class="carousel">
    <el-carousel :interval="8000" type="card" height="150px">
      <el-carousel-item v-for="(banner, index) in banners" :key="index" @click="click(index)">
        <img :src="banner.pic"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useBanners } from '../composables/useBanner'
import { useEventBus } from '../composables/useEvents';

export default defineComponent({
  setup() {
    const { banners, loadBanners } = useBanners();
    (async () => await loadBanners())()
    const { bus } = useEventBus()
    const click = (index: number) => {
      const song = banners.value[index].song
      if (song) {
        bus.value.emit('play', song)
      }
    }
    return {
      banners,
      click
    }
  }
})

</script>
<style scoped>
.carousel {
  margin: 0 auto;
  max-width: 768px;
}
img {
  width: 100%;
  height: 100%;
}
</style>
