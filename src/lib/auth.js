import {
  signInWithPopup, GoogleAuthProvider, TwitterAuthProvider, createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './firebaseConfig.js';

/* ---------------------------- Registro---------------------------------------------*/

export const autenticacion = () => {
  const email = document.getElementById('mail').value;
  const password = document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert('El usuario se registro con exito');
      // Signed in
      const user = userCredential.user;
      user.textContent = '';
      // ...
      document.getElementById('mail').value = '';
      document.getElementById('password').value = '';
    })
    .catch((error) => {
      if (error.code === 'auth/email-already-in-use') {
        alert('Usuario existente');
      } else if (error.code === 'auth/invalid-email') {
        alert('Correo electrónico inválido');
      } else if (error.code === 'auth/weak-password') {
        alert('La contraseña debe tener al menos 6 caracteres');
      } else {
        alert('Ha ocurrido un error');
      }
      document.getElementById('mail').value = '';
      document.getElementById('password').value = '';
    });
};
/* ---------------------------- Login con Google---------------------------------------------*/

export const loginWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log('Comentario', user);
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorMessage = error.message;
      console.log('erorrrrrr', errorMessage);
      // ...
    });
};

/* ---------------------------- Login con Twitter---------------------------------------------*/
export const loginWithTwitter = () => {
  const provider = new TwitterAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
      // ..
    }).catch((error) => {
      // Handle Errors here.
      const errorMessage = error.message;
      console.log('erorrrrrr', errorMessage);
      // ...
    });
};
