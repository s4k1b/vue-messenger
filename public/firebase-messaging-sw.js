importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.15.0/firebase-messaging.js');

// self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings();
// workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// workbox.routing.registerRoute(
//   new RegExp('https://firebasestorage.googleapis.com/v0/b/cropchien.appspot.com/.*'),
//   workbox.strategies.staleWhileRevalidate()
// );

firebase.initializeApp({
  apiKey: 'AIzaSyD83SRCWzQ_p8fO8sXjZFjs36kt5cT621c',
  authDomain: 'vue-messenger-38447.firebaseapp.com',
  databaseURL: 'https://vue-messenger-38447.firebaseio.com',
  projectId: 'vue-messenger-38447',
  storageBucket: 'vue-messenger-38447.appspot.com',
  messagingSenderId: '338844177032',
  appId: '1:338844177032:web:15e0ec73d88fec58e5453d',
  measurementId: 'G-6NSZ78P8RX',
});
const messaging = firebase.messaging();

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
messaging.setBackgroundMessageHandler(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  const { data } = payload;
  // Customize notification here
  const notificationTitle = data.title;
  const notificationOptions = {
    body: data.body,
    icon: data.icon,
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});
