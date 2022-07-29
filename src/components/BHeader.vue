<template>
  <div
    class="Header"
    :class="[header === true ? 'side-menu--open' : false]"
  >
  <div class="Header__sidemenu" @click="sidemenu(true)">
      <i class="fa-solid fa-bars"></i>
    </div>
    <div class="Header-card passive-menu"
      :class="[header === true ? 'active-menu' : false]"
    ><span class="Header-card--close" @click="sidemenu(false)">
      <i class="fa-solid fa-x"></i>
      </span>
      <template v-if="userinfo !== null">
          <div class="Header-card__info">
            <span class="Header-card__icon"><i class="fa-regular fa-user"></i></span>
            <span class="Header-card__name">{{userinfo.id}}님</span>
            <span class="Header-card__email">{{userinfo.email}}</span>
          </div>
            <BButton @click="logout" class="Header-card base-btn__Header--logout">로그아웃</BButton>
      </template>
      <template v-else>
        <div class="Header-card__btn">
        <router-link to="/login" class="Header-card--login base-btn__Header">로그인</router-link>
        <router-link to="/signup" class="Header-card--signup base-btn__Header">회윈가입</router-link>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
import BButton from '@/components/BButton.vue'
import Http from '@/service/Http'
import { useState } from '@/stores/helper'
import router from '@/router'
export default {
  components: { BButton },
  setup () {
    const http = new Http()
    const headerCard = ref(null)
    const header = ref(false)
    const { userinfo } = useState('user')
    const logout = async () => {
      await http.get('/member/logout')
      userinfo.value = null
      alert('로그아웃')
      router.push('/')
    }
    // sidemenu클래스값부여
    const sidemenu = (e) => {
      if (e === true) {
        header.value = true
        return
      }
      header.value = false
    }
    // userinfo 가져오기
    onMounted(async () => {
      const info = await http.get('/member/getMemberInfo')
      userinfo.value = info
    })
    return {
      logout,
      headerCard,
      header,
      sidemenu,
      userinfo
    }
  }
}
</script>
