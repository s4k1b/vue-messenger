<template>
  <div id="app">
    <messenger v-if="user.loggedIn" />
    <authenticate v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { currentUserState } from '@/firebase/auth.js';

export default {
  name: 'App',
  components: {
    Messenger: () => import('@/components/Messenger'),
    Authenticate: () => import('@/components/Authenticate'),
  },

  computed: {
    ...mapGetters({ user: 'user' }),
  },

  beforeCreate() {
    // get and set current user state
    currentUserState();
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
