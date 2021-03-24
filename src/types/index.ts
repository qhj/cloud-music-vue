import { InjectionKey, Ref } from "vue";

export const isCollapseKey: InjectionKey<Ref<boolean>> = Symbol()
  
interface Hots {
  first: string
  second: number
  third: any
  iconType: number
}

export interface HotResponse {
  code: number
  result: {
    hots: Hots[]
  }
}

interface Artists {
  id: number
  name: string
  alias: string[]
  alia: string[]
  // [key: string]: any
}

interface Album {
  id: number
  name: string
  picUrl: string
  pic_str: string
  pic: number
  // [key: string]: any
}

export interface SongMeta {
  name: string
  id: number
  ar: Artists[]
  al: Album
  dt: number
}

export interface SearchResult {
  result: {
    songs: SongMeta[]
    songCount: number
  }
  code: number
}

export interface Song {
  id: number
  url: string
}

export interface SongResponse {
  code: number
  data: Song[]
}

export interface Banner {
  pic: string
  song?: SongMeta
}

export interface BannerResponse {
  banners: Banner[]
  code: 200
}
