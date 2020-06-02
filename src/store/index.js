import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: {},
    },
  },
  getters: {
    user(state) {
      return state.user || {};
    },
  },
  mutations: {
    user$set(state, user) {
      state.user = user;
    },
    user$login(state, { user, token }) {
      state.user.loggedIn = true;
      state.user.data = user;
      state.user.token = token;
    },
    user$logout(state) {
      state.user.loggedIn = false;
      state.user.data = {};
      state.user.token = '';
    },
  },
  actions: {},
  modules: {},
});
