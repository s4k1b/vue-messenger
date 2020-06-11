import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';
import firebase from 'firebase/app';
import 'firebase/messaging';

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

firebase
  .messaging()
  .usePublicVapidKey(
    'BBIOTN74z7Ltwj4mg5qV6jxOj7ultrDYuETqQX51dH4P5rOEGC6kjEA3gnGlQVr7p5i2-6H6m9Sl5R72XTnaP_c'
  );

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
