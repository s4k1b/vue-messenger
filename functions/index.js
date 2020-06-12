const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// get database reference
const db = admin.database();

exports.sendNotifications = functions.database
  .ref('/messages/{messageId}')
  .onCreate(async (snapshot, context) => {
    const messageOb = snapshot.val();
    // get sender info
    const senderInfoSnapshot = await db.ref(`/users/${messageOb.senderId}/info`).once('value');
    const senderInfo = senderInfoSnapshot.val();

    const { name: senderName, imageUrl: senderImageUrl } = senderInfo;

    const data = {
      title: `New Message from ${senderName}`,
      body: messageOb.message,
      icon: senderImageUrl,
      click_action: 'https://vue-fcm-messenger.firebaseapp.com',
    };

    // for firebase console output
    console.info(data);

    // get receiver token for sending notification
    const receiverTokenSnapshot = await db
      .ref(`/users/${messageOb.receiverId}/token`)
      .once('value');
    const receiverToken = receiverTokenSnapshot.val();

    if (receiverTokenSnapshot) {
      // send message to device

      const message = {
        token: receiverToken,
        data,
      };

      console.info(message);

      // Send a message to the device corresponding to the provided
      // registration token.
      try {
        await admin.messaging().send(message);
        console.info('Successfully sent message');
      } catch (e) {
        console.error(e);
      }
    }
  });
