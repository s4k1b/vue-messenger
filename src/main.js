import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';
import firebase from 'firebase/app';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyD83SRCWzQ_p8fO8sXjZFjs36kt5cT621c',
  authDomain: 'vue-messenger-38447.firebaseapp.com',
  databaseURL: 'https://vue-messenger-38447.firebaseio.com',
  projectId: 'vue-messenger-38447',
  storageBucket: 'vue-messenger-38447.appspot.com',
  messagingSenderId: '338844177032',
  appId: '1:338844177032:web:15e0ec73d88fec58e5453d',
  measurementId: 'G-6NSZ78P8RX',
};

firebase.initializeApp(firebaseConfig);

import Toasted from 'vue-toasted';
Vue.use(Toasted, {
  position: 'bottom-right',
  duration: 2500,
  theme: 'bubble',
  iconPack: 'fontawesome',
});

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
