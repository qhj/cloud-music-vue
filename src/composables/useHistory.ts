import { ref } from "@vue/reactivity";

const history = ref<string[]>([])

const updateCache = () => {
  localStorage.setItem('history', JSON.stringify(history.value))
}

export const useHistory = () => {
  const cache = localStorage.getItem('history')
  if (cache) {
    history.value = JSON.parse(cache)
  }

  const addHistory = (word: string) => {
    if (!history.value.includes(word)) {
      history.value.push(word)
    } else {
      const index = history.value.indexOf(word)
      history.value.splice(index, 1)
      history.value.unshift(word)
    }
    updateCache()
  }
  const deleteHistory = (index: number) => {
    history.value.splice(index, 1)
    updateCache()
  }
  const emptyHistory = () => {
    history.value = []
    updateCache()
  }
  
  return { history, addHistory, deleteHistory, emptyHistory }
}
