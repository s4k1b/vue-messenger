import firebase from 'firebase/app';
import 'firebase/messaging';

const messaging = firebase.messaging();

messaging.usePublicVapidKey(
  'BBIOTN74z7Ltwj4mg5qV6jxOj7ultrDYuETqQX51dH4P5rOEGC6kjEA3gnGlQVr7p5i2-6H6m9Sl5R72XTnaP_c'
);

export default messaging;

// get current token
messaging
  .getToken()
  .then((currentToken) => {
    if (currentToken) {
      sendTokenToServer(currentToken);
      updateUIForPushEnabled(currentToken);
    } else {
      // Show permission request.
      console.log('No Instance ID token available. Request permission to generate one.');
      // Show permission UI.
      updateUIForPushPermissionRequired();
      setTokenSentToServer(false);
    }
  })
  .catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    showToken('Error retrieving Instance ID token. ', err);
    setTokenSentToServer(false);
  });

// monitor token refresh
messaging.onTokenRefresh(async () => {
  // refreshed token
  try {
    const refreshedToken = await messaging.getToken();
    console.log('token refreshed');
    setTokenSentToServer(false);
    sendTokenToServer(refreshedToken);
  } catch (e) {
    console.log('unable to retrieve refreshed token', e);
    showToken('Unable to retrieve refreshed token ', err);
  }
});
