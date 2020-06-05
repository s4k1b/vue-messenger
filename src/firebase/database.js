import firebase from 'firebase/app';
import 'firebase/database';

function setUserData(userId, email, name, imageUrl) {
  firebase
    .database()
    .ref('users/' + userId)
    .set({ uid: userId, email, name, imageUrl });
}

async function users$read() {
  return await firebase.database().ref('/users').once('value');
}

async function user$read(userId) {
  return await firebase.database().ref(`/users/${userId}`).once('value');
}

function contacts$write(userId, contactId) {
  firebase
    .database()
    .ref('users/' + userId + '/contacts/' + contactId)
    .set(true);
}

async function contactList$read(userId) {
  return await firebase.database().ref(`/users/${userId}/contacts`).once('value');
}

export { setUserData, users$read, user$read, contacts$write, contactList$read };
