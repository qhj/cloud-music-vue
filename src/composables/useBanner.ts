import { ref } from "vue"
import { http } from "../services/fetch"
import { Banner, BannerResponse } from "../types"

export const useBanners = () => {
  const banners = ref<Banner[]>([])

  const loadBanners = async () => {
    const data = await http<BannerResponse>(`/banner?type=3`)
    banners.value = data.banners
  }

  return { banners, loadBanners }
}
