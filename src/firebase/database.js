import firebase from 'firebase/app';
import 'firebase/database';

function setUserData(userId, email, name, imageUrl) {
  firebase
    .database()
    .ref('users/' + userId)
    .set({ uid: userId, email, name, imageUrl });
}

export { setUserData };
