<template>
  <div class='table-pagebtn'>
    <BButton class='table-pagebtn--btn table-pagebtn--prev' @click="prevPage">
      <i class="fa-solid fa-arrow-left"></i>
    </BButton>
    <BButton
      v-for='i in getMaxPage'
      :key='i'
      class="table-pagebtn--btn"
      :class="[nowpage == i ? 'selectPage' : false]"
    >
    <router-link
      :to='`/?idx=${i}`'
    >{{i}}</router-link>
    </BButton>
    <BButton class='table-pagebtn--btn table-pagebtn--next' @click="nextPage">
      <i class="fa-solid fa-arrow-right"></i>
    </BButton>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useGetters } from '@/stores/helper'
import router from '@/router'
import { computed } from 'vue'
import BButton from '@/components/BButton.vue'
export default {
  components: { BButton },
  props: {
    btn: {
      type: Object,
      default: () => {}
    }
  },
  setup () {
    const route = useRoute()
    const { getMaxPage } = useGetters('pagination')
    const { idx } = route.query
    const pageIndex = Number(idx) || 1
    const prevPage = () => {
      if (pageIndex === 1) return
      router.push(`/?idx=${pageIndex - 1}`)
    }
    const nextPage = () => {
      if (pageIndex >= getMaxPage.value) return
      router.push(`/?idx=${pageIndex + 1}`)
    }
    return {
      prevPage,
      nextPage,
      getMaxPage,
      nowpage: computed(() => route.query.idx)
    }
  }
}
</script>

<style>

</style>
