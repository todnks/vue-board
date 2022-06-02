<template>
  <div class="home">
    <router-link to="/signup" v-if="!userData.id">회윈가입</router-link>
    <BButton v-if='userlogin' @click="logout">로그아웃</BButton>
    <router-link v-if="userData.id" to="/write">글작성</router-link>
    <router-link v-else to="/login">로그인</router-link>
    <p v-if="userData.id">{{userData.name}}환영합니다</p>
    <ul>
      <h1>게시판</h1>
      <li v-bind:key='item' v-for='item in listsetup'>글제목 {{item.title}} - 글내용 {{item.listtext}} - 글쓴이 {{item.name}}</li>
    </ul>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import BButton from '@/components/BButton.vue';
import { computed } from 'vue';
import axios from 'axios';
export default {
  name: "HomeView",
  components: { BButton },
  setup() {
    const store = useStore();
      axios.get('/list').then((list)=>{
        store.commit('setUplist', list.data);
      });
      const logout = () => {
        store.commit('setUserData', {});
        store.commit('setUserlogin', false);
        alert("로그아웃");
      }
      return {
        logout,
        userData: computed(() => store.state.userData),
        userlogin: computed(() => store.state.userlogin),
        listsetup: computed(() => store.state.listsetup),
      };
  },
}
</script>

