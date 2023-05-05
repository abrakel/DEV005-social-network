/* eslint-disable no-console */
/* eslint-disable no-alert */
import { autenticacion } from '../lib/auth';

function registro(navigateTo) {
  const section = document.createElement('section');
  section.class = 'formulario';

  /* Elementos */
  const form1 = document.createElement('div');
  form1.classList.add('register');

  const title = document.createElement('h2');
  title.classList.add('petregister');

  const img = document.createElement('img');
  img.id = 'imagen';
  img.src = '../Img/logo.jpg';

  /* ----------- Correo ---------------------*/
  const mailLabel = document.createElement('label');
  const mail = document.createElement('input');
  mailLabel.textContent = 'Correo electrónico:';
  mailLabel.setAttribute('for', 'mail');
  mail.id = 'mail';
  mail.placeholder = 'usuario@dominio.com';
  mail.addEventListener('blur', () => {
    const email = mail.value;
    if (!email.endsWith('@gmail.com') && !email.endsWith('@hotmail.com')) {
      const mensaje = document.createElement('span');
      mensaje.textContent = ('Introduzca una dirección de correo electrónico válida', mail);
      mail.value = '';
    }
  });
  document.body.appendChild(mailLabel);
  document.body.appendChild(mail);

  /* ----------- Contraseña ---------------------*/
  const passwordLabel = document.createElement('label');
  const password = document.createElement('input');
  passwordLabel.textContent = 'Contraseña:';
  passwordLabel.setAttribute('for', 'password');
  password.id = 'password';
  password.minLength = 6;
  password.maxLength = 10;
  password.type = 'password';
  password.placeholder = 'Enter a password';

  const botoncontraseña = document.createElement('button');
  botoncontraseña.setAttribute('class', 'boton2');
  botoncontraseña.textContent = 'Mostrar contraseña';

  // Añadimos el botón a la etiqueta de la contraseña
  passwordLabel.appendChild(botoncontraseña);

  // Añadimos el EventListener al botón
  botoncontraseña.addEventListener('click', () => {
    if (password.type === 'password') {
      password.type = 'text';
      botoncontraseña.textContent = 'Ocultar contraseña';
    } else {
      password.type = 'password';
      botoncontraseña.textContent = 'Mostrar contraseña';
    }
  });

  /* ----------- Botón regreso ---------------------*/
  const buttonReturn = document.createElement('button');
  buttonReturn.id = 'back';
  buttonReturn.textContent = 'Regresar';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  /* ----------- Botón de Registro ---------------------*/
  const register = document.createElement('button');
  register.id = 'regist';
  register.textContent = 'Registrarse';
  register.addEventListener('click', () => {
    autenticacion(mail.value, password.value)
      .then((userCredential) => {
        alert('El usuario se registro con exito');
        // Signed in
        const user = userCredential.user;
        user.textContent = '';
        // ...
        mail.value = '';
        password.value = '';
      })
      .catch((error) => {
        const mensaje1 = document.createElement('span');
        mensaje1.textContent = error;
        mail.value = '';
        password.value = '';
      });

    console.log('si sirvo');
  });

  title.textContent = 'Pet Registro';

  section.append(img, form1);
  form1.append(
    title,
    mailLabel,
    mail,
    mailLabel,
    mail,
    passwordLabel,
    password,
    botoncontraseña,
    register,
    buttonReturn,
  );
  return section;
}

export default registro;
