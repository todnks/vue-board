import dayjs from 'dayjs'
import { defineStore } from 'pinia'
import { useState } from './helper'

const useBoardStore = defineStore('board', {
  state: () => ({
    list: null,
    board: { skeleton: 'on' }
  }),
  actions: {
    ListhSetup (data) {
      if (data !== null) {
        data.map(e => {
          if (e.updateDate) {
            e.updateDate = dayjs(e.updateDate).format('YYYY-MM-DD/HH:mm')
          }
          e.registDate = dayjs(e.registDate).format('YYYY-MM-DD/HH:mm')
          return e
        })
      }
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
      this.board = data
    }
  }
})

export default useBoardStore
