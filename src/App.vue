<template>
  <div id="app">
    <messenger v-if="user.loggedIn" />
    <authenticate v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { currentUserState } from '@/firebase/auth.js';
import { user$setToken, user$getToken } from '@/firebase/database.js';
import firebase from 'firebase/app';
import 'firebase/messaging';

export default {
  name: 'App',
  components: {
    Messenger: () => import('@/components/Messenger'),
    Authenticate: () => import('@/components/Authenticate'),
  },

  data() {
    return {
      messaging: firebase.messaging(),
    };
  },

  computed: {
    ...mapGetters({ user: 'user' }),
  },

  created() {
    // get and set current user state
    currentUserState();

    // add listener for refreshing and getting token
    this.addListenerToRefreshToken();

    // add listener to handle message receiving of push message
    this.addListenerToReceiveAndHandleNewMessage();
  },

  watch: {
    user: {
      deep: true,
      handler() {
        this.getAndSetToken();
      },
    },
  },

  methods: {
    async getAndSetToken() {
      try {
        // request permission to allow notification
        await this.messaging.requestPermission();

        // request to get token
        const token = await this.messaging.getToken();

        // send token to database
        // get previous token
        const prevToken = await user$getToken(this.user && this.user.data && this.user.data.uid);
        if (prevToken !== token) {
          // if token changed then set token
          user$setToken(this.user && this.user.data && this.user.data.uid, token);
        }
      } catch (e) {
        console.log(e);
      }
    },
    addListenerToRefreshToken() {
      try {
        this.messaging.onTokenRefresh(this.getToken);
      } catch (e) {
        console.log(e);
      }
    },

    handleMessage(payload) {
      console.log('onMessage', payload.data);
    },
    addListenerToReceiveAndHandleNewMessage() {
      this.messaging.onMessage(this.handleMessage);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
