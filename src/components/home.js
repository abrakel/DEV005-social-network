import {
  GoogleAuthProvider, signInWithPopup, getAuth,
} from 'firebase/auth';
import {
  revision,
} from '../lib/auth';

function home(navigateTo) {
  const section = document.createElement('section');
  // Elementos
  const img = document.createElement('img');
  const form = document.createElement('form');
  form.class = 'form1';
  const title = document.createElement('h1');
  const division = document.createElement('div');
  const forgetPass = document.createElement('button');
  forgetPass.textContent = 'Olvidé contraseña';
  forgetPass.setAttribute('class', 'forgetPass-b');
  division.setAttribute('class', 'divhome');

  /* ----------------Imagenes -------------------------*/
  img.setAttribute('src', '../img/logo.jpg');
  img.setAttribute('alt', 'logo de Patitas.com');
  img.setAttribute('class', 'logo');

  /* ----------------Registrarse-------------------------*/
  const register = document.createElement('button');
  register.textContent = 'Registrarse';
  register.setAttribute('class', 'register-b');
  register.addEventListener('click', () => {
    navigateTo('/registro');
  });

  /* ------------------ Correo ---------------------*/
  const mailUser = document.createElement('label');
  const mail = document.createElement('input');
  mail.id = 'mailUser';
  mail.placeholder = 'usuario@dominio.com';
  mail.addEventListener('blur', () => {
    const email = mail.value;
    if (!email.endsWith('@gmail.com') && !email.endsWith('@hotmail.com')) {
      alert('Introduzca una dirección de correo electrónico válida');
      mail.value = '';
    }
  });
  document.body.appendChild(mailUser);
  document.body.appendChild(mail);

  /* ------------------ Contraseña ---------------------*/
  const passUser = document.createElement('label');
  const password = document.createElement('input');
  password.id = 'password1';
  password.minLength = 6;
  password.maxLength = 10;
  password.type = 'password';
  password.placeholder = 'Enter a password';

  /* ---------------- Iniciar sesión-------------------------*/
  const login = document.createElement('button');
  login.setAttribute('id', 'login-b');
  login.setAttribute('class', 'loginb');
  login.textContent = 'INICIAR SESIÓN';
  mailUser.textContent = 'Correo electrónico:';
  passUser.textContent = 'Contraseña:';
  title.textContent = 'Patitas.com';
  login.addEventListener('click', (e) => {
    e.preventDefault();
    revision(mail.value, password.value)
      .then((user) => {
        navigateTo('/muro');
        console.log(user);
      }).catch((error) => {
        console.error('Tienes un error', error);
        mail.value = '';
        password.value = '';
      });
  });

  /* ----------------Iniciar con google-------------------------*/
  const loginGoogle = document.createElement('button');
  loginGoogle.textContent = 'Inicia sesión con Google';
  loginGoogle.setAttribute('id', 'loginGoogle-b');

  loginGoogle.addEventListener('click', async (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);

        const user = result.user;
        console.log(user);

        console.log(credential);
        navigateTo('/muro');
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/user-not-found') {
          errorMessage('El usuario no está registrado.');
        } else if (errorCode === 'auth/wrong-password') {
          errorMessage('La contraseña no es correcta.');
        } else if (errorCode === 'auth/invalid-email') {
          errorMessage('El correo electrónico no tiene el formato correcto.');
        } else if (errorCode === 'auth/credential-already-in-use') {
          errorMessage('Las credenciales ya están siendo utilizadas.');
        } else if (errorCode === 'auth/network-request-failed') {
          errorMessage('Ha ocurrido un error de red.');
        } else {
          console.log(errorMessage);
        }
      });
  });

  section.append(img, form);
  form.append(
    title,
    mailUser,
    mail,
    passUser,
    password,
    division,
    loginGoogle,
    login,
  );
  division.append(register, forgetPass);
  return section;
}

export default home;
