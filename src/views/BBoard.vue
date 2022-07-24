<template>
    <div class='board'>
      <div class='board-header__btn'>
        <router-link to='/' class='base-btn__board'>홈으로</router-link>
      </div>
      <Board :list='boardopen'></Board>
      <div class='board-bottom'>
        <template>
          <router-link :to='`/write?idx=${boardopen.idx}`' class='base-btn__board'>글수정</router-link>
          <b-button @click='listdelete' class='base-btn__board'>글삭제</b-button>
        </template>
        <router-link to='/' class='base-btn__board board-bottom--home'>홈으로</router-link>
      </div>
    </div>
</template>
<script>
import BButton from '@/components/BButton.vue'
import Board from '@/components/BBoard.vue'
import router from '@/router'
import axios from 'axios'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import dayjs from 'dayjs'
import { useActions, useState } from '@/stores/helper'

export default {
  components: { BButton, Board },
  setup () {
    const route = useRoute()
    const { idx } = route.params
    const { boardinfo } = useActions('board')
    const { boardopen } = useState('board')
    const { userData } = useState('user')

    onMounted(async () => {
      const { data } = await axios.get(`/board/${idx}`)
      data.registDate = dayjs(data.registDate).format('YYYY-MM-DD/HH:mm')
      boardinfo(data)
    })
    const listdelete = () => {
      axios.delete(`/api/v1/board/${boardopen.value.idx}`)
      router.push('/')
    }
    return {
      boardopen,
      userData,
      listdelete
    }
  }
}
</script>
