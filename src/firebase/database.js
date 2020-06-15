import firebase from 'firebase/app';
import 'firebase/database';
import Store from '@/store';

function setUserData(userId, email, name, imageUrl) {
  firebase
    .database()
    .ref('users/' + userId + '/info')
    .set({ uid: userId, email, name, imageUrl });
}

async function users$read() {
  return await firebase.database().ref('/users').once('value');
}

async function user$read(userId) {
  return await firebase.database().ref(`/users/${userId}/info`).once('value');
}

function user$setToken(userId, token) {
  firebase
    .database()
    .ref('users/' + userId + '/token')
    .set(token);
}

async function user$getToken(userId) {
  return await firebase
    .database()
    .ref('/users' + userId + '/token')
    .once('value');
}

function contacts$write(userId, contactId) {
  firebase
    .database()
    .ref('users/' + userId + '/contacts/' + contactId)
    .set({ status: true, lastContacted: false, uid: contactId });
}

async function contactList$read(userId) {
  return await firebase.database().ref(`/users/${userId}/contacts`).once('value');
}

function lastContacted$write(userId, contactId, verdict) {
  firebase.database().ref(`users/${userId}/contacts/${contactId}/lastContacted`).set(verdict);
}

async function lastContacted$read(userId, contactId) {
  return await firebase
    .database()
    .ref(`users/${userId}/contacts/${contactId}/lastContacted`)
    .once('value');
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
  const identifier = [userId, contactId].sort().join('-');
  const ref = firebase.database().ref('/messages');
  ref
    .orderByChild('identifier')
    .equalTo(identifier)
    .limitToLast(50)
    .on(event, () => {
      Store.dispatch('messages$fetch', { userId, contactId });
    });
}

function messages$off() {
  const ref = firebase.database().ref('/messages');
  ref.off();
}

async function lastMessage$read(userId, contactId) {
  const identifier = [userId, contactId].sort().join('-');
  return await firebase
    .database()
    .ref('/messages')
    .orderByChild('identifier')
    .equalTo(identifier)
    .limitToLast(1)
    .once('value');
}

export {
  setUserData,
  users$read,
  user$read,
  user$setToken,
  user$getToken,
  contacts$write,
  contactList$read,
  lastContacted$write,
  lastContacted$read,
  messages$write,
  messages$read,
  messages$on,
  messages$off,
  lastMessage$read,
};
