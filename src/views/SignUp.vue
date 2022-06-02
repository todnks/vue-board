<template>
  <div>
    <h2>회원가입</h2>
    <b-input placeholder="아이디" v-model="userid" />
    <b-input placeholder="비밀번호" type="password" v-model="password" />
    <b-input placeholder="이름" v-model="name" />
    <b-button @click="signUp">회원가입</b-button>
  </div>
</template>

<script>
import BInput from '@/components/BInput.vue';
import BButton from '@/components/BButton.vue';
import { reactive, toRefs } from 'vue';
import router from '@/router';
import axios from 'axios';

export default {
  components: { BInput, BButton },
  setup() {
    const form = reactive({
      userid: '',
      password: '',
      name: '',
    });
    const signUp = async () => {
    if(axios.get('/member',{
      userid: form.userid,
    })){
      alert('이미 사용중인 아이디 입니다');
      return;
    };
      await axios.post('/member', {
        ...form,
      });
      alert('회원가입 되었습니다.');
      router.push('/');
    };
    return {
      ...toRefs(form),
      signUp,
    };
  },
};
</script>

<style>

</style>