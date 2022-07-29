<template>
  <div class='home-floatbox'>
    <!-- <span class='home__countlist'>{{btn.count}}</span> -->
    <BListSearch/>
  <router-link to='/write' class='table-btn--write base-btn__board'>글쓰기</router-link>
  </div>
  <b-table
    :header="tableHeader"
    :items="list"
  />
  <b-pagination />
  <router-link
  to='/write'
  class='table-btn--write base-btn__board'
  >글쓰기
  </router-link>
</template>
<script>
import axios from 'axios'
import BListSearch from '@/components/BListSearch.vue'
import BTable from '@/components/BTable'
import BPagination from '@/components/BPagination.vue'
import { watch } from 'vue'
import { useActions, useState } from '@/stores/helper'
import { useRoute } from 'vue-router'
import router from '@/router'

export default {
  components: { BListSearch, BPagination, BTable },
  setup () {
    const route = useRoute()
    const { setBoardList } = useActions('board')
    const { list } = useState('board')
    const { search } = useState('table')
    const tableHeader = [
      { title: '글 작성자', key: 'writer' },
      { title: '글 제목', key: 'subject' },
      { title: '작성일자', key: 'registDate' }
    ]
    const getBoardList = async () => {
      const { data } = await axios.get('/board/list', {
        params: {
          search: search.value,
          page: route.query.idx || 1
        }
      })
      setBoardList(data)
      document.querySelector('.table-pagebtn').disabled = false
    }
    getBoardList()
    watch(() => route.query.idx, () => {
      getBoardList()
    })
    watch(() => search.value, () => {
      getBoardList()
      router.push('/?idx=1')
    })
    return {
      tableHeader,
      list
    }
  }
}
</script>

<style>

</style>
