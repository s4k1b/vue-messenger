<template>
  <div class="row authenticate-wrapper">
    <div class="col-4"></div>
    <button class="col-4 align-self-center sign-in-btn" @click.prevent="userLogin()">
      Sign in
    </button>
    <div class="col-4"></div>
  </div>
</template>

<script>
import { googleAuth } from '@/firebase/auth.js';

export default {
  methods: {
    async userLogin() {
      await googleAuth();
    },
  },
};
</script>
