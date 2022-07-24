<template>
  <div class='Header'>
    <div class='Header__sidemenu' @click='sidemenu(`open`)'>
      <i class='fa-solid fa-bars'></i>
    </div>
    <div class='Header-card passive-menu'>
      <span class='Header-card--close' @click='sidemenu(`close`)'><i class="fa-solid fa-x"></i></span>
      <template v-if='userinfo !== null'>
          <div class='Header-card__info'>
            <span class='Header-card__icon'><i class="fa-regular fa-user"></i></span>
            <span class='Header-card__name'>{{userinfo.id}}님</span>
            <span class='Header-card__email'>{{userinfo.email}}</span>
          </div>
            <BButton @click='logout' class='Header-card--logout base-btn__Header'>로그아웃</BButton>
      </template>
      <template v-else>
        <div class='Header-card__btn'>
        <router-link to='/login' class='Header-card--login base-btn__Header'>로그인</router-link>
        <router-link to='/signup' class='Header-card--signup base-btn__Header'>회윈가입</router-link>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import { onMounted } from 'vue'
import BButton from '@/components/BButton.vue'
import Http from '@/service/Http'
import { useState } from '@/stores/helper'

export default {
  components: { BButton },
  setup () {
    const http = new Http()
    const { userinfo } = useState('user')
    const logout = async () => {
      await http.get('/member/logout')
      alert('로그아웃')
    }
    // sidemenu클래스값부여
    const sidemenu = (e) => {
      if (e === 'open') {
        document.querySelector('.Header-card').classList.add('active-menu')
        document.querySelector('.Header').classList.add('side-menu--open')
        document.body.classList.add('gnbopen')
        return
      }
      document.querySelector('.Header-card').classList.remove('active-menu')
      document.querySelector('.Header').classList.remove('side-menu--open')
      document.body.classList.remove('gnbopen')
    }
    // userinfo 가져오기
    onMounted(async () => {
      const info = await http.get('/member/getMemberInfo')

      userinfo.value = info
    })
    return {
      logout,
      sidemenu,
      userinfo
    }
  }
}
</script>
