import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import { User } from '../reducer';

const firebaseConfig = {
  apiKey: 'AIzaSyDF7szVmVEj_qTKyIaRLA8053IpgPf7xoI',
  authDomain: 'userslist-30270.firebaseapp.com',
  databaseURL: 'https://userslist-30270.firebaseio.com',
  projectId: 'userslist-30270',
  storageBucket: 'userslist-30270.appspot.com',
  messagingSenderId: '1002495225690',
  appId: '1:1002495225690:web:4b1820d91c5fedc0e90d63',
  measurementId: 'G-PMS05NKFH5',
};

firebase.initializeApp(firebaseConfig);

const dataBase = firebase.firestore();

const usersCollection = () => dataBase.collection('users');
const userDoc = (id: string) => usersCollection().doc(id);
const userMaker = (
  user: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>
): User => {
  const newUser = user.data();
  if (newUser) newUser.id = user.id;
  return newUser as User;
};

export const fetchUsresApi = () =>
  usersCollection()
    .get()
    .then((snapshot) => {
      const users: User[] = [];
      snapshot.forEach((user) => {
        users.push(userMaker(user));
      });
      return users;
    });

export const addUserApi = (user: User) =>
  usersCollection()
    .add(user)
    .then((doc) => doc.get().then((user) => userMaker(user)));

export const deleteUserApi = (id: string) => userDoc(id).delete();

export const updateUserApi = (user: User) =>
  user.id && userDoc(user.id).update(user);

export const signUpAuthUserApi = (email: string, password: string) =>
  firebase.auth().createUserWithEmailAndPassword(email, password);

export const signInAuthUserApi = (email: string, password: string) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

export const signOutAuthUserApi = () => firebase.auth().signOut();

interface AuthUser {
  displayName: string | null;
  photoUrl: string | null;
  id: string | null;
}

export const fetchAuthUserApi = (emitter: (arg0: AuthUser) => void) =>
  firebase.auth().onAuthStateChanged((firebaseAuthUser) => {
    if (firebaseAuthUser) {
      emitter({
        displayName: firebaseAuthUser.displayName,
        photoUrl: firebaseAuthUser.photoURL,
        id: firebaseAuthUser.uid,
      });
    } else {
      emitter({
        displayName: '',
        photoUrl: '',
        id: '',
      });
    }
  });
