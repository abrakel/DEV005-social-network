/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable no-alert */
import { autenticacion } from '../lib/auth';

function registro(navigateTo) {
  const section = document.createElement('section');
  section.class = 'formulario';

  /* Elementos */
  const form1 = document.createElement('div');
  form1.classList.add('register');

  const title = document.createElement('h1');
  title.classList.add('i-r-title');

  const img = document.createElement('img');
  img.id = 'imagen';
  img.src = '../Img/logo.jpg';
  const error = document.createElement('span');
  error.setAttribute('class', 'error1');
  error.textContent = '';
  /* ----------- Correo ---------------------*/
  const mailLabel = document.createElement('label');
  const mail = document.createElement('input');
  mailLabel.textContent = 'Correo electrónico:';
  mailLabel.setAttribute('for', 'mail');
  mail.id = 'mail';
  const allowedDomains = ['gmail.com', 'hotmail.com'];
  // Configura el evento blur para validar el correo electrónico
  mail.placeholder = 'usuario@dominio.com';
  mail.addEventListener('blur', () => {
    const email = mail.value;
    const domain = email.split('@')[1]; // Obtén el dominio de correo electrónico
    if (!allowedDomains.includes(domain)) {
      error.textContent = 'Por favor, ingrese una dirección de correo electrónico válida';
      mail.value = ''; // Borra el correo electrónico
      setTimeout(() => {
        error.textContent = ''; // Borra el mensaje de error después de 3 segundos
      }, 3000);
    }
  });
  document.body.appendChild(mailLabel);
  document.body.appendChild(mail);

  /* ----------- Contraseña ---------------------*/
  const divPassField = document.createElement('div');
  divPassField.className = 'div-password-home';
  const divPass = document.createElement('div');
  divPass.className = 'div-pass-eye';
  const passwordLabel = document.createElement('label');
  const password = document.createElement('input');
  passwordLabel.textContent = 'Contraseña:';
  passwordLabel.setAttribute('for', 'password');
  password.id = 'password1';
  password.className = 'pass-input';
  password.minLength = 6;
  password.maxLength = 10;
  password.type = 'password';
  password.placeholder = 'Ingrese contraseña';

  const showPasswordBtn = document.createElement('button');
  showPasswordBtn.setAttribute('class', 'showPasswordBtn-b');
  showPasswordBtn.innerHTML = '<i class="fa-solid fa-eye" style="color: #635994;"></i>';

  // Añadimos el botón a la etiqueta de la contraseña
  divPassField.append(passwordLabel, divPass);
  divPass.append(password, showPasswordBtn);

  // Añadimos el EventListener al botón
  showPasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (password.type === 'password') {
      password.type = 'text';
      showPasswordBtn.innerHTML = '<i class="fa-solid fa-eye-slash" style="color: #635994;"></i>';
    } else {
      password.type = 'password';
      showPasswordBtn.innerHTML = '<i class="fa-solid fa-eye" style="color: #635994;"></i>';
    }
  });

  /* ----------- Botón regreso ---------------------*/
  const buttonReturn = document.createElement('button');
  buttonReturn.className = 'return-b';
  buttonReturn.textContent = 'Regresar';
  buttonReturn.addEventListener('click', () => {
    navigateTo('/');
  });

  /* ----------- Botón de Registro ---------------------*/
  const register = document.createElement('button');
  register.id = 'regist';
  register.textContent = 'Registrarse';
  register.addEventListener('click', (e) => {
    e.preventDefault();
    autenticacion(mail.value, password.value, error)
      .then((userCredential) => {
        error.textContent = 'El usuario se registró con éxito';
        // Signed in
        const user = userCredential.user;
        user.textContent = '';
      })
      .catch((errorMessage) => {
        error.textContent = errorMessage; // Mostrar mensaje de error en el elemento "error"
      });
  });

  console.log('si sirvo');

  title.textContent = 'Pet Registro';

  section.append(img, form1);
  form1.append(
    title,
    mailLabel,
    mail,
    mailLabel,
    mail,
    passwordLabel,
    divPassField,
    register,
    buttonReturn,
    error,
  );
  return section;
}

export default registro;
