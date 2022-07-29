<template>
      <div class='home-search'>
        <b-input-search v-model='search.text' @keydown.enter='searchsubject' placeholder='검색'/>
      <div class='home__searchbtn' @click='searchsubject'>
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
</template>

<script>
import BInputSearch from '@/components/BInputSearch.vue'
import { useActions } from '@/stores/helper'

export default {
  components: { BInputSearch },
  setup () {
    const { searchSet } = useActions('table')
    const search = {
      text: ''
    }
    const searchsubject = async () => {
      searchSet(search.text)
    }
    return {
      searchsubject,
      search
    }
  }
}
</script>

<style>

</style>
