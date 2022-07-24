import dayjs from 'dayjs'
import { defineStore } from 'pinia'
import { useState } from './helper'

const useBoardStore = defineStore('board', {
  state: () => ({
    list: null,
    boardopen: {}
  }),
  actions: {
    ListhSetup (data) {
      data.map(e => {
        if (e.updateDate) {
          e.updateDate = dayjs(e.updateDate).format('YYYY-MM-DD/HH:mm')
        }
        e.registDate = dayjs(e.registDate).format('YYYY-MM-DD/HH:mm')
        return e
      })
      this.list = data
    },
    setBoardList ({ list, count }) {
      const { totalCount } = useState('pagination')
      const data = list.map((item) => ({
        ...item,
        registDate: dayjs(item.registDate).format('YYYY-MM-DD/HH:mm'),
        updateDate: item.registDate ?? dayjs(item.registDate).format('YYYY-MM-DD/HH:mm')
      }))
      this.list = data
      totalCount.value = count
    },
    boardinfo (data) {
      this.boardopen = data
    }
  }
})

export default useBoardStore
