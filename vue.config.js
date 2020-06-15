module.exports = {
  pwa: {
    name: 'vue-fcm-messenger',
    themeColor: '#27ae60',
    msTileColor: '#27ae60',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/firebase-messaging-sw.js',
    },
  },
};
