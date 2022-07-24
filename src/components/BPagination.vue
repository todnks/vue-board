<template>
  <div class='table-pagebtn'>
    <div class='table-pagebtn--btn table-pagebtn--prev' @click="prevPage">
      <i class="fa-solid fa-arrow-left"></i>
    </div>
    <router-link
      v-for='i in getMaxPage'
      :key='i'
      class="table-pagebtn--btn"
      :to='`/?idx=${i}`'
    >{{i}}</router-link>
    <div class='table-pagebtn--btn table-pagebtn--next' @click="nextPage">
      <i class="fa-solid fa-arrow-right"></i>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useGetters } from '@/stores/helper'
import router from '@/router'

export default {
  props: {
    btn: {
      type: Object,
      default: () => {}
    }
  },
  setup () {
    const route = useRoute()
    const { getMaxPage } = useGetters('pagination')

    const prevPage = () => {
      const { idx } = route.query
      const pageIndex = Number(idx) || 1

      if (pageIndex === 1) return

      router.push(`/?idx=${pageIndex - 1}`)
    }

    const nextPage = () => {
      const { idx } = route.query
      const pageIndex = Number(idx) || 1

      if (pageIndex >= getMaxPage.value) return

      router.push(`/?idx=${pageIndex + 1}`)
    }

    return {
      prevPage,
      nextPage,
      getMaxPage
    }
  }
}
</script>

<style>

</style>
