<template>
  <div class="row authenticate-wrapper">
    <div class="col-4"></div>
    <button class="col-4 align-self-center sign-in-btn" @click.prevent="googleLogin()">
      Sign in
    </button>
    <div class="col-4"></div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  methods: {
    async googleLogin() {
      console.log(firebase);
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');

      try {
        await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

        const result = await firebase.auth().signInWithPopup(provider);
        const token = result.credential.accessToken;
        const user = result.user;

        this.$store.commit('user$login', { user, token });
      } catch (e) {
        console.log(e.message);
        this.$store.commit('user$logout');
      }
    },
  },
};
</script>
