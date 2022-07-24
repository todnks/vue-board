<template>
    <div class='board-content'>
        <div class='board-header'>
        <div class='board-header__user-icon'><i class="fa-regular fa-user"></i></div>
        <div class='board-header-title'>
          <h1 class='board-header__subject'>{{list.subject}}</h1>
          <div class='board-header__info' @mouseleave='userlist(false)'>
            <span class='board-header__writer' @mouseover='userlist(true)'>{{list.writer}}</span>
            <div class='board-header--popup' v-if='ckevt.userclick === true'>
              <router-link :to='`/${list.writer}/?idx=1`'>작성자 글 더보기</router-link>
            </div>
            <span class='board-header__date'>{{list.registDate}}</span>
          </div>
        </div>
        </div>
        <div class='board__text'>
          <p>{{list.content}}</p>
          <div class='board__link'>
            <router-link :to='`/${list.writer}/?idx=1`'>{{list.writer}}님의 글 더보기 ></router-link>
          </div>
        </div>
    </div>
</template>
<script>
import { reactive } from '@vue/reactivity'
export default {
  props: {
    list: Object,
    default: {}
  },
  setup () {
    const ckevt = reactive({
      userclick: false
    })
    const userlist = (e) => {
      if (e === true) {
        ckevt.userclick = true
      }
      if (e !== true) {
        ckevt.userclick = false
      }
    }
    return {
      userlist,
      ckevt
    }
  }
}
</script>

<style>

</style>
