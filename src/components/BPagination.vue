<template>
  <div class='table-pagebtn'>
    <BButton class='table-pagebtn--btn table-pagebtn--prev' @click="pageMove('prev')">
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
    <BButton class='table-pagebtn--btn table-pagebtn--next' @click="pageMove('next')">
      <i class="fa-solid fa-arrow-right"></i>
    </BButton>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useGetters } from '@/stores/helper'
import router from '@/router'
import { computed, onMounted } from 'vue'
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

    const pageMove = (e) => {
      const { idx } = route.query
      const pageIndex = Number(idx) || 1
      if (e === 'next') {
        if (pageIndex >= getMaxPage.value) return
        router.push(`/?idx=${pageIndex + 1}`)
        return
      }
      if (pageIndex === 1) return
      router.push(`/?idx=${pageIndex - 1}`)
    }
    onMounted(() => {
      const { idx } = route.query
      if (!idx) {
        const pageIndex = Number(idx) || 1
        router.push(`/?idx=${pageIndex}`)
      }
    })
    return {
      pageMove,
      getMaxPage,
      nowpage: computed(() => route.query.idx)
    }
  }
}
</script>

<style>

</style>
