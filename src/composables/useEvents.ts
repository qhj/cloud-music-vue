import { ref } from "@vue/reactivity"

type Callback = (data: any) => any

interface Events {
  [key: string]: Callback[]
}

// https://stackoverflow.com/a/64045893
// https://css-tricks.com/an-early-look-at-the-vue-3-composition-api-in-the-wild/
class EventBus {
  constructor(private events: Events = {}) {}
  
  on(eventName: string, callback: Callback) {
    this.events[eventName] = this.events[eventName] || []
    this.events[eventName].push(callback)
  }
  
  off(eventName: string, callback: Callback) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((cb, index) => {
        if (cb === callback) {
          this.events[eventName].splice(index, 1)
        }
      })
    }
  }
  
  emit(eventName: string, data: any) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => {
        callback(data)
      })
    }
  }
}

const bus = ref(new EventBus())

export const useEventBus = () => {
  return { bus }
}
