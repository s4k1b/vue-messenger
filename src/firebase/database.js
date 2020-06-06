import firebase from 'firebase/app';
import 'firebase/database';
import Store from '@/store';

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

function messages$write(senderId, receiverId, message, time) {
  const identifier = [senderId, receiverId].sort().join('-');
  firebase
    .database()
    .ref('messages/')
    .push()
    .set({ senderId, receiverId, message, time, identifier });
}

async function messages$read(userId, contactId) {
  const identifier = [userId, contactId].sort().join('-');
  return await firebase
    .database()
    .ref('/messages')
    .orderByChild('identifier')
    .equalTo(identifier)
    .limitToLast(50)
    .once('value');
}

function messages$on(event, userId, contactId) {
  const ref = firebase.database().ref('/messages');
  ref.on(event, (data) => {
    const value = data.val();
    if (value.senderId === userId || value.receiverId === userId) {
      Store.dispatch('messages$fetch', { userId, contactId });
    }
  });
}

function messages$off() {
  const ref = firebase.database().ref('/messages');
  ref.off();
}

export {
  setUserData,
  users$read,
  user$read,
  contacts$write,
  contactList$read,
  messages$write,
  messages$read,
  messages$on,
  messages$off,
};
