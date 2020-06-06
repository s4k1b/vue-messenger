import Vue from 'vue';
import Vuex from 'vuex';
import { users$read, user$read, contactList$read } from '@/firebase/database.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: {},
    },

    allUsers: [],
    contacts: [],
  },
  getters: {
    user(state) {
      return state.user || {};
    },

    allUsers(state) {
      return state.allUsers || [];
    },
    contacts(state) {
      return state.contacts || [];
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

    allUsers$set(state, users) {
      state.allUsers = users;
    },
    contacts$set(state, contacts) {
      state.contacts = contacts;
    },
  },
  actions: {
    async allUsers$fetch({ commit }) {
      try {
        const snapshot = await users$read();
        const users = snapshot.val();

        commit('allUsers$set', Object.values(users));
      } catch (e) {
        Vue.toasted.error(e && e.message);
      }
    },

    async contacts$fetch({ commit }, { userId }) {
      try {
        const contactsSnapShot = await contactList$read(userId);
        const contacts = contactsSnapShot.val();

        const promiseList = Object.keys(contacts)
          .filter((contactKey) => contacts[contactKey])
          .map((contactKey) => {
            return user$read(contactKey);
          });

        const contactsWithInfo = await Promise.all(promiseList);
        commit(
          'contacts$set',
          contactsWithInfo.map((contact) => contact.val())
        );
      } catch (e) {
        Vue.toasted.error(e && e.message);
      }
    },
  },
  modules: {},
});
