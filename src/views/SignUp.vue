<template>
  <div class="member-container">
    <router-link class="member-container--back" to="/"><i class="fa-solid fa-arrow-left"></i></router-link>
      <h2>회원가입</h2>
      <div class="member__form">
        <div class="input__member">
          <span class="member-form__icon"><i class="fa-regular fa-user"></i></span>
          <b-input placeholder="아이디" v-model="id" class="member-form__input base-input" />
        </div>
        <div class="input__member">
          <span class="member-form__icon"><i class="fa-solid fa-lock"></i></span>
          <b-input placeholder="비밀번호" type="password" v-model="password" class="member-form__input base-input" />
        </div>
        <div class="input__member">
          <span class="member-form__icon"><i class="fa-solid fa-pencil"></i></span>
          <b-input placeholder="이름" v-model="name" class="member-form__input base-input" />
        </div>
        <div class="input__member">
          <span class="member-form__icon"><i class="fa-solid fa-envelope"></i></span>
          <b-input placeholder="이메일" v-model="email" class="member-form__input base-input" />
        </div>
        <b-button @click="signUp" class="member-form__btn base-btn__member">회원가입</b-button>
      </div>
  </div>
</template>

<script>
import BInput from '@/components/BInput.vue'
import BButton from '@/components/BButton.vue'
import { reactive, toRefs } from 'vue'
import router from '@/router'
import Http from '@/service/Http'

export default {
  components: { BInput, BButton },
  setup () {
    // email 타입 체크 정규식
    const http = new Http()
    const emailreg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
    const form = reactive({
      id: '',
      password: '',
      name: '',
      email: ''
    })
    const validation = {
      id: '아이디를 입력해주세요',
      password: '비밀번호를 입력해주세요',
      name: '이름을 입력해라',
      email: '이메일 달라'
    }

    // 회원가입
    const signUp = async () => {
      for (const key of Object.keys(validation)) {
        if (!form[key]) {
          alert(validation[key])
          return
        }
      }
      if (form.email.match(emailreg) === null) {
        alert('이메일형식')
        return
      }
      const { success } = await http.post('/member/signup ', {
        ...form
      })

      if (success) {
        alert('회원가입')
        router.push('/')
      }
    }
    return {
      ...toRefs(form),
      signUp
    }
  }
}
</script>

<style>

</style>
