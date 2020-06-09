import Vue from 'vue';
import Vuex from 'vuex';
import { users$read, user$read, contactList$read, messages$read } from '@/firebase/database.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: {},
    },

    allUsers: [],
    contacts: [],
    lastContacted: '',

    activeChat: {},
    messages: [],
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
    lastContacted(state) {
      return state.lastContacted || '';
    },

    activeChat(state) {
      return state.activeChat || {};
    },
    messages(state) {
      return state.messages || [];
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
    lastContacted$set(state, lastContacted) {
      state.lastContacted = lastContacted;
    },

    activeChat$set(state, activeChat) {
      state.activeChat = activeChat;
    },
    messages$set(state, messages) {
      state.messages = messages;
    },
  },
  actions: {
    async allUsers$fetch({ commit }) {
      try {
        const snapshot = await users$read();
        const users = snapshot.val();

        commit(
          'allUsers$set',
          Object.keys(users).map((key) => users[key].info)
        );
      } catch (e) {
        Vue.toasted.error(`Failed fetching all users: ${e && e.message}`);
      }
    },

    async contacts$fetch({ commit }, { userId }) {
      try {
        const contactsSnapShot = await contactList$read(userId);
        const contacts = contactsSnapShot.val();

        // set last contacted id
        const lastContacted = Object.keys(contacts).find(
          (contactKey) => contacts[contactKey].status && contacts[contactKey].lastContacted
        );
        commit('lastContacted$set', lastContacted);

        const promiseList = Object.keys(contacts)
          .filter((contactKey) => contacts[contactKey].status)
          .map((contactKey) => {
            return user$read(contactKey);
          });

        const contactsWithInfo = await Promise.all(promiseList);
        commit(
          'contacts$set',
          contactsWithInfo.map((contact) => contact.val())
        );
      } catch (e) {
        console.log(e);
        commit('contacts$set', []);
        Vue.toasted.info(
          'Your contact list is empty, please click the Add Contacts button to add contacts'
        );
      }
    },

    async messages$fetch({ commit }, { userId, contactId }) {
      try {
        const messagesSnapshot = await messages$read(userId, contactId);
        const messagesObj = messagesSnapshot.val();
        commit('messages$set', (messagesObj && Object.values(messagesObj)) || []);
      } catch (e) {
        Vue.toasted.info(`Failed fetching messages: ${e && e.message}`);
      }
    },
  },
  modules: {},
});
