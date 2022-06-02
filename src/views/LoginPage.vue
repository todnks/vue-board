<template>
  <div>
    <h2>로그인</h2>
    <b-input placeholder="아이디" v-model="userid" />
    <b-input placeholder="비밀번호" type="password" v-model="password" />
    <b-button @click="login">회원가입</b-button>
  </div>
</template>

<script>
import BInput from '@/components/BInput.vue';
import BButton from '@/components/BButton.vue';
import router from '@/router';
import { reactive, toRefs } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

export default {
  components: { BInput, BButton },
  setup() {
    const store = useStore();
    const log = reactive({
      userid : '',
      password: '',
    }); 
    const login = async() => {
      const { data } = await axios.get('/member', {
        params: {
          ...log
        }
      });
       
      if(!data.length){
        alert("다시 로그인");
        return;
      }
      const [ userData ] = data;
      if(!axios.get('/sessionid')){
        axios.post('/sessionid',{...userData});
      }

      store.commit('setUserData', userData);
      store.commit('setUserlogin', true);
      
      alert('로그인 되었습니다.');
      
      router.push('/');
    };

    return {
      login,
      ...toRefs(log),
    };
  },
};
</script>

<style>

</style>