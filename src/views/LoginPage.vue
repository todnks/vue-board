<template>
<div class='member-container'>
  <router-link class='member-container--back' to='/'><i class="fa-solid fa-arrow-left"></i></router-link>
      <h2>로그인</h2>
      <div class='member__form'>
        <div class='input__member'>
          <span class='member-form__icon'><i class='fa-regular fa-user'></i></span>
          <b-input placeholder='아이디' v-model='id' class='member-form__input' @focus='inputfocus' @blur='inputfocus(`out`)'/>
        </div>
        <div class='input__member'>
          <span class='member-form__icon'><i class="fa-solid fa-lock"></i></span>
          <b-input placeholder='비밀번호' type='password' v-model='password' class='member-form__input input--pasword' @focus='inputfocus' @blur='inputfocus(`out`)'/>
        </div>
        <b-button @click='login' class='member-form__btn base-btn__member'>로그인</b-button>
        <div v-if='errortext.errorcode !== ``'>
          <p class='member__form__errortext'>{{errortext.errorcode}}</p>
        </div>
        <div class='member__form__signup' v-if='errortext.signup > 2'>
          <p>아이디가 없으신가요? <router-link to='/signup' class='member__form__signup--btn'>회원가입</router-link>을해주세요</p>
        </div>
    </div>
  </div>
</template>

<script>
import BInput from '@/components/BInput.vue'
import BButton from '@/components/BButton.vue'
import { onUnmounted, reactive, toRefs } from 'vue'
import router from '@/router'
import axios from 'axios'
export default {
  components: { BInput, BButton },
  setup () {
    const form = reactive({
      id: '',
      password: ''
    })
    const errortext = reactive({
      errorcode: '',
      signup: 0
    })
    const validation = reactive({
      id: '',
      password: ''
    })
    // 로그인
    const login = async () => {
      for (const key of Object.keys(validation)) {
        if (!form[key]) {
          alert(validation[key])
          return
        }
      }
      const data = await axios.post('/member/signin ', {
        ...form
      })
      console.log(data)
      router.push('/')
    }
    // input에 클래스부여
    const inputfocus = (e) => {
      event.target.parentElement.classList.add('focuson')
      if (e === 'out') {
        event.target.parentElement.classList.remove('focuson')
      }
    }
    document.body.classList.add('member-back')
    // 페이지 이탈시 실행
    onUnmounted(() => {
      document.body.classList.remove('member-back')
    })
    return {
      login,
      ...toRefs(form),
      errortext,
      inputfocus,
      validation
    }
  }
}
</script>

<style>
</style>
