import { defineStore } from 'pinia'

const usePaginationStore = defineStore('pagination', {
  state: () => ({
    totalCount: 0,
    page: 1,
    pageSize: 10
  }),
  getters: {
    getMaxPage (state) {
      return Math.ceil(state.totalCount / state.pageSize)
    }
  }
})

export default usePaginationStore
