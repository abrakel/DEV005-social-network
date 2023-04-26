import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './firebaseConfig.js';

/* ---------------------------- Ingreso ---------------------------------------------*/

export const revision = (email, password) => new Promise((resolve, reject) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      resolve(userCredential);
    })
    .catch((error) => {
      let mensaje = 'Ha ocurrido un error';
      if (error.code === 'auth/invalid-email') {
        mensaje = 'Correo electrónico inválido';
      } if (error.code === 'auth/wrong-password') {
        mensaje = 'La contraseña es incorrecta. Por favor, intenta de nuevo.';
      }
      reject(mensaje);
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
