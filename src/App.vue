<template>
  <div id="app">
    <messenger v-if="user.loggedIn" />
    <authenticate v-else />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'App',
  components: {
    Messenger: () => import('@/components/Messenger'),
    Authenticate: () => import('@/components/Authenticate'),
  },

  computed: {
    ...mapGetters({ user: 'user' }),
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
