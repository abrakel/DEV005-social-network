/* eslint-disable no-console */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider, signInWithPopup,
} from 'firebase/auth';

import { auth } from './firebaseConfig.js';

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
      let errorMessage = 'Ha ocurrido un error';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Usuario existente';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Correo electrónico inválido';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      }
      reject(errorMessage);
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
