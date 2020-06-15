import firebase from 'firebase/app';
import 'firebase/auth';
import { setUserData } from './database';
import store from '@/store';

async function googleAuth() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');

  try {
    const result = await firebase.auth().signInWithPopup(provider);

    // save user to database
    const user = result.user;
    setUserData(user.uid, user.email, user.displayName, user.photoURL);
  } catch (e) {
    throw e.message;
  }
}

async function userSignOut() {
  try {
    await firebase.auth().signOut();
  } catch (e) {
    console.log(e.message);
  }
}

function currentUserState(getAndSetToken) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      store.commit('user$set', { loggedIn: true, data: user });
      getAndSetToken();
    } else {
      store.commit('user$set', { loggedIn: false, data: {} });
    }
  });
}

export { googleAuth, userSignOut, currentUserState };
