import { defineStore } from 'pinia'
const usePaginationStore = defineStore('pagination', {
  state: () => ({
    totalCount: 0,
    page: null,
    pageSize: 10
  }),
  getters: {
    getMaxPage (state) {
      return Math.ceil(state.totalCount / state.pageSize)
    }
  },
  actions: {
    nowPage (data) {
      this.page = data
    }
  }
})

export default usePaginationStore
