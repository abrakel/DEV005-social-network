import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCMA-XWyMc2_N3RuceKDj37LA6NLOEnAME',
  authDomain: 'patitas-91318.firebaseapp.com',
  projectId: 'patitas-91318',
  storageBucket: 'patitas-91318.appspot.com',
  messagingSenderId: '921200296229',
  appId: '1:921200296229:web:df299b6a8def7ea1399acc',
  measurementId: 'G-114X4TQL1F',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const taskCollection = collection(db, 'tasks');

export {
  app, auth, db, taskCollection,
};
