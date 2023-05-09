/* eslint-disable no-console */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup,
} from 'firebase/auth';

/* import {
  collection, addDoc, getDocs, onSnapshot, doc as firestoreDoc, deleteDoc, getDoc,
} from 'firebase/firestore'; */
import { auth /* db */ } from './firebaseConfig.js';

/* ---------------------------- Ingreso ---------------------------------------------*/

export const revision = (email, password, error1) => new Promise((resolve, reject) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      resolve(userCredential);
    })
    .catch((error) => {
      error1.textContent = 'Ha ocurrido un error';
      if (error.code === 'auth/invalid-email') {
        error1.textContent = 'Correo electrónico inválido';
      } else if (error.code === 'auth/wrong-password') {
        error1.textContent = 'La contraseña es incorrecta. Por favor, intenta de nuevo.';
      } else if (error.code === 'auth/user-not-found') {
        error1.textContent = 'Usuario no existe, favor registrarse';
      }
      reject(error1.textContent);
    });
});
/* ---------------------------- Registro---------------------------------------------*/

export const autenticacion = (email, password) => new Promise((resolve, reject) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      resolve(userCredential);
    })
    .catch((error) => {
      let mensaje = 'Ha ocurrido un error';
      if (error.code === 'auth/email-already-in-use') {
        mensaje = 'Usuario existente';
      } else if (error.code === 'auth/invalid-email') {
        mensaje = 'Correo electrónico inválido';
      } else if (error.code === 'auth/weak-password') {
        mensaje = 'La contraseña debe tener al menos 6 caracteres';
      }
      reject(mensaje);
    });
});

/* ---------------------------- Ingreso---------------------------------------------*/
export const loginGoogle1 = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  const token = credential.accessToken;
  // eslint-disable-next-line no-console
  console.log(token);
  const user = result.user;
  console.log(user);
  console.log(credential);
};

/* ---------------------------- Post ---------------------------------------------*/

/* let editStatus = false;
let id = '';

const saveTask = async (taskTitle, taskDescription) => {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), {
      taskTitle,
      taskDescription,
    });
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
