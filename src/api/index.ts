import firebase from 'firebase/app';
import 'firebase/firestore';
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

const getUsresApi = () =>
  usersCollection()
    .get()
    .then((snapshot) => {
      const users: User[] = [];
      snapshot.forEach((user) => {
        users.push(userMaker(user));
      });
      return users;
    });

const addUserApi = (user: User) =>
  usersCollection()
    .add(user)
    .then((doc) => doc.get().then((user) => userMaker(user)));

const deleteUserApi = (id: string) => userDoc(id).delete();

const updateUserApi = (user: User) => user.id && userDoc(user.id).update(user);

export { getUsresApi, addUserApi, deleteUserApi, updateUserApi };
