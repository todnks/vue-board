import { createStore } from 'vuex';
export default createStore({
  state: {
    userData: {},
    userlogin: false,
    listsetup: null,
  },
  getters: {
  },
  mutations: {
    setUserData(state, data) {
      state.userData = data;
    },
    setUserlogin(state, data) {
      state.userlogin = data;
    },
    setUplist(state,data) {
      state.listsetup = data;
    }
  },
  actions: {
  },
});
