import { ref } from "vue"
import { http } from "../services/fetch"
import { SongMeta, SearchResult } from "../types"

export const useSingles = () => {
  const singles = ref<SongMeta[]>([])
  const totalSongs = ref(0)

  const loadSingles = async (word: string, type: string) => {
    const data = await http<SearchResult>(`/cloudsearch?keywords=${word}&type=${type}`)
    singles.value = data.result.songs
    totalSongs.value = data.result.songCount
  }

  return { singles, totalSongs, loadSingles }
}
