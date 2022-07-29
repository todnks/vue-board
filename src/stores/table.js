import { defineStore } from 'pinia'

const useTableStore = defineStore('table', {
  state: () => ({
    listsortstate: {
      name: null,
      state: 'none'
    },
    search: ''
  }),
  actions: {
    listsort ({ name, sortstate }) {
      if (this.listsortstate.state === 'listup') sortstate = 'listdown'
      if (this.listsortstate.state === 'listdown') sortstate = 'none'
      if (this.listsortstate.name !== name) sortstate = 'listup'
      this.listsortstate = { name: name, state: sortstate }
    },
    searchSet (data) {
      this.search = data
    }
  }
})

export default useTableStore
