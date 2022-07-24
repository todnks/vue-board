import { defineStore } from 'pinia'

const useTableStore = defineStore('table', {
  state: () => ({
    listsortstate: ''
  }),
  actions: {
    listsort ({ sortstate }) {
      if (this.listsortstate === 'listup') sortstate = 'listdown'
      if (this.listsortstate === 'listdown') sortstate = ''
      this.listsortstate = sortstate
    }
  }
})

export default useTableStore
