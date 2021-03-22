import { ref } from "vue"
import { http } from "../services/fetch"
import { Song, SongMeta, SongResponse } from "../types"

// https://www.youtube.com/watch?v=VMJvXT4H6JM
export const useSong = () => {
  const song = ref<Song | null>(null)
  // https://stackoverflow.com/a/65518088

  const loadSong = async (songMeta: SongMeta) => {
    const data = await http<SongResponse>('/song/url?id=' + songMeta.id.toString())
    song.value = data.data[0]
  }

  return { song, loadSong }
}
