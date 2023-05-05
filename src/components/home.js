/* eslint-disable no-console */

import {
  loginGoogle1,
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
      // eslint-disable-next-line no-alert
      const mensaje = document.createElement('span');
      mensaje.textContent = ('Introduzca una dirección de correo electrónico válida', mail);
      /* alert('Introduzca una dirección de correo electrónico válida'); */
      mail.value = '';
    }
  });
  document.body.appendChild(mailUser);
  document.body.appendChild(mail);

  /* ------------------ Contraseña ---------------------*/
  const passUser = document.createElement('label');
  const password = document.createElement('input');
  passUser.textContent = 'Contraseña:';
  password.id = 'password1';
  password.minLength = 6;
  password.maxLength = 10;
  password.type = 'password';
  password.placeholder = 'Enter a password';

  const showPasswordBtn = document.createElement('button');
  showPasswordBtn.setAttribute('class', 'showPasswordBtn-b');
  showPasswordBtn.textContent = 'Mostrar contraseña';

  // Añadimos el botón a la etiqueta de la contraseña
  passUser.appendChild(showPasswordBtn);

  // Añadimos el EventListener al botón
  showPasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (password.type === 'password') {
      password.type = 'text';
      showPasswordBtn.textContent = 'Ocultar contraseña';
    } else {
      password.type = 'password';
      showPasswordBtn.textContent = 'Mostrar contraseña';
    }
  });

  /* ---------------- Iniciar sesión-------------------------*/
  const login = document.createElement('button');
  login.setAttribute('id', 'login-b');
  login.setAttribute('class', 'loginb');
  login.textContent = 'INICIAR SESIÓN';
  mailUser.textContent = 'Correo electrónico:';
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
    loginGoogle1().then(() => {
      navigateTo('/muro');
    }).catch((error) => {
      // Handle Errors here.
      const mensaje = document.createElement('span');
      mensaje.textContent = 'Ha ocurrido un error';
      if (error.code === 'auth/email-already-in-use') {
        mensaje.textContent = 'Usuario existente';
      } else if (error.code === 'auth/invalid-email') {
        mensaje.textContent = 'Correo electrónico inválido';
      } else if (error.code === 'auth/weak-password') {
        mensaje.textContent = 'La contraseña debe tener al menos 6 caracteres';
      }
      console.log(mensaje.textContent);
    });
  });

  section.append(img, form);
  form.append(
    title,
    mailUser,
    mail,
    passUser,
    password,
    showPasswordBtn,
    division,
    loginGoogle,
    login,
  );
  division.append(register);
  return section;
}

export default home;
