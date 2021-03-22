import { inject, InjectionKey } from "@vue/runtime-core";

// https://logaretm.com/blog/2020-12-23-type-safe-provide-inject/
export const useInjection = <T>(key: InjectionKey<T>, fallbackValue?: T) => {
  const resolved = inject(key, fallbackValue)
  if (!resolved) {
    throw new Error(`Could not resolve ${key.description}`)
  }
  return resolved
}
