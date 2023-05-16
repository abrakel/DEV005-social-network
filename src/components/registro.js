import { autenticacion } from '../lib/auth';
import showPasswordBtn from './home.js';

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
      alert('Introduzca una dirección de correo electrónico válidas');
      mail.value = '';
    }
  });
  document.body.appendChild(mailLabel);
  document.body.appendChild(mail);

  /* ----------- Contraseña ---------------------*/
  const divPassField = document.createElement('div');
  divPassField.className = 'div-password-home';
  const divPass = document.createElement('div');
  divPass.className = 'div-pass-eye'
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
  showPasswordBtn.innerHTML = '<i class="fa-solid fa-eye" style="color: #635994;"></i>'

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
    };
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
        alert(error);
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
    divPassField,
    register,
    buttonReturn,
  );
  return section;
}

export default registro;
