import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
  state: () => ({
    userinfo: null
  })
})

export default useUserStore
