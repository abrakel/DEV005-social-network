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

  const passwordLabel = document.createElement('label');
  const password = document.createElement('input');
  passwordLabel.textContent = 'Password:';
  passwordLabel.setAttribute('for', 'password');
  password.id = 'password';
  password.maxLength = 10;
  password.type = 'password';
  password.placeholder = 'Enter a password';

  const mailLabel = document.createElement('label');
  const mail = document.createElement('input');
  mailLabel.textContent = 'Email:';
  mailLabel.setAttribute('for', 'mail');
  mail.id = 'mail';
  mail.placeholder = 'Write your email';

  const buttonReturn = document.createElement('button');
  buttonReturn.textContent = 'Regresar';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  const register = document.createElement('button');
  register.id = 'regist';
  register.textContent = 'Registrarse';
  register.addEventListener('click', () => {
    autenticacion();
    console.log('si sirvo');
  });

  title.textContent = 'Pet Registro';

  section.append(img, form1);
  form1.append(
    title,
    passwordLabel,
    password,
    mailLabel,
    mail,
    register,
    buttonReturn,
  );
  return section;
}

export default registro;
