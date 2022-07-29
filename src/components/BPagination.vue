<template>
  <fieldset class="table-pagebtn">
    <BButton class="table-pagebtn--btn table-pagebtn--prev" @click="pageMove('prev')">
      <i class="fa-solid fa-arrow-left"></i>
    </BButton>
    <BButton
      v-for="i in getMaxPage"
      :key="i"
      class="table-pagebtn--btn"
      :class="[page == i ? 'selectBtn' : false]"
      @click="pageMove(i)"
    >{{i}}
    </BButton>
    <BButton class="table-pagebtn--btn table-pagebtn--next" @click="pageMove('next')">
      <i class="fa-solid fa-arrow-right"></i>
    </BButton>
  </fieldset>
</template>

<script>
import { useGetters, useActions, useState } from '@/stores/helper'
import router from '@/router'
import { onMounted } from 'vue'
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
    const { page } = useState('pagination')
    const { getMaxPage } = useGetters('pagination')
    const { ListhSetup } = useActions('board')
    const pageMove = (e) => {
      if (e === page.value) return
      if (e === 'next') {
        if (page.value >= getMaxPage.value) return
        router.push(`/?idx=${page.value + 1}`)
      }
      if (e === 'prev') {
        if (page.value === 1) return
        router.push(`/?idx=${page.value - 1}`)
      }
      if (e !== 'next' && e !== 'prev') {
        router.push(`/?idx=${e}`)
      }
      document.querySelector('.table-pagebtn').disabled = true
      ListhSetup(null)
    }
    onMounted(() => {
      if (!page) {
        router.push(`/?idx=${page}`)
      }
    })
    return {
      pageMove,
      getMaxPage,
      page
    }
  }
}
</script>
