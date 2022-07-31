<template>
  <div class="table">
    <div class="table__header">
      <div
        v-for="(item, key) in header"
        :key="key"
        @click="sortstate(item.key)"
        :class="[sort.name === item.key ? sort.state : 'none']"
      >{{ item.title }}
      <i class="fa-solid fa-arrow-down"></i>
      </div>
    </div>
    <b-list-skeleton v-if="!items"/>
      <div v-if="items" class="table__list">
        <div v-for="(item, key) in items" :key="key">
          <div>{{ item.writer }}</div>
          <div>
            <router-link :to="`/board/${item.idx}`">{{ item.subject }}</router-link>
          </div>
          <div>{{ item.registDate }}</div>
        </div>
      </div>
  </div>
</template>

<script>
import { useActions, useState } from '@/stores/helper'
import BListSkeleton from '@/components/BListSkeleton.vue'
export default {
  components: { BListSkeleton },
  props: {
    header: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const { listsort } = useActions('table')
    const { listsortstate } = useState('table')
    const { list } = useState('board')
    const { boardinfo } = useActions('board')
    const sortstate = (e) => {
      listsort({ name: e, sortstate: 'listup' })
      sortlist(e, listsortstate.value.state)
    }

    const sortlist = (name, state) => {
      if (state === 'listup') {
        list.value.sort((a, b) => {
          return a[name] < b[name] ? -1 : a[name] > b[name] ? 1 : 0
        })
        return
      }
      if (state === 'listdown') {
        list.value.sort((a, b) => {
          return a[name] > b[name] ? -1 : a[name] < b[name] ? 1 : 0
        })
        return
      }
      list.value.sort((a, b) => {
        return a.idx > b.idx ? -1 : a.idx < b.idx ? 1 : 0
      })
    }
    boardinfo({ skeleton: 'on' })
    return {
      sortstate,
      sortlist,
      sort: listsortstate,
      list
    }
  }
}
</script>
