<template>
      <div class='home-search'>
        <b-input-search v-model='search.text' @keydown.enter='searchsubject' placeholder='검색' @blur='addclass(false)'/>
      <div class='home__searchbtn' @click='searchsubject'>
        <i class="fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
</template>

<script>
import Http from '@/service/Http'
import BInputSearch from '@/components/BInputSearch.vue'
import { useActions } from '@/stores/helper'

export default {
  components: { BInputSearch },
  setup () {
    const http = new Http()
    const { ListhSetup } = useActions('board')
    const search = {
      text: ''
    }
    const searchsubject = async (e) => {
      const { list } = await http.get('/board/list', {
        search: search.text
      })
      ListhSetup(list)
    }
    const addclass = (v) => {
      const $searchBar = document.querySelector('.home__searchbar')
      if (v) {
        $searchBar.classList.add('input--focus')
        return
      }
      $searchBar.classList.remove('input--focus')
    }
    return {
      searchsubject,
      search,
      addclass
    }
  }
}
</script>

<style>

</style>
