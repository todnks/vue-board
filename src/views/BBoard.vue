<template>
    <div class="board">
      <div class="board-header__btn">
        <router-link to="/" class="base-btn__board">홈으로</router-link>
      </div>
      <b-board-skeleton v-if="board.skeleton" />
      <Board :list="board" v-if="!board.skeleton" />
      <div class="board-bottom">
        <template v-if="userinfo !== null && board.userIdx === userinfo.userIdx">
          <router-link :to="`/write?idx=${board.idx}`" class="base-btn__board">글수정</router-link>
          <b-button @click="listdelete" class="base-btn__board">글삭제</b-button>
        </template>
        <router-link to="/" class="base-btn__board board-bottom--home">홈으로</router-link>
      </div>
    </div>
</template>
<script>
import BButton from '@/components/BButton.vue'
import Board from '@/components/BBoard.vue'
import BBoardSkeleton from '@/components/BBoardSkeleton.vue'
import router from '@/router'
import Http from '@/service/Http'
import { onMounted } from 'vue'
import dayjs from 'dayjs'
import { useActions, useState } from '@/stores/helper'
export default {
  components: { BButton, Board, BBoardSkeleton },
  setup () {
    const http = new Http()
    const { boardinfo } = useActions('board')
    const { board } = useState('board')
    const { userinfo } = useState('user')
    const { page } = useState('pagination')
    onMounted(async () => {
      const data = await http.get(`/board/${page.value}`)
      data.registDate = dayjs(data.registDate).format('YYYY-MM-DD/HH:mm')
      boardinfo(data)
    })
    const listdelete = () => {
      http.delete('/board', {
        params: {
          idx: board.value.idx
        }
      })
      router.push('/?idx=1')
    }
    return {
      board,
      userinfo,
      listdelete
    }
  }
}
</script>
