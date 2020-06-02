import firebase from 'firebase/app';
import 'firebase/auth';
import store from '@/store';

async function googleAuth() {
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('profile');
  provider.addScope('email');

  try {
    await firebase.auth().signInWithPopup(provider);

    // save user to database
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

function currentUserState() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      store.commit('user$set', { loggedIn: true, data: user });
    } else {
      store.commit('user$set', { loggedIn: false, data: {} });
    }
  });
}

export { googleAuth, userSignOut, currentUserState };
