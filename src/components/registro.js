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
      alert('Introduzca una dirección de correo electrónico válida');
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

  /* ----------- Botón regreso ---------------------*/
  const buttonReturn = document.createElement('button');
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
        document.getElementById('mail').value = '';
        document.getElementById('password').value = '';
      })
      .catch((error) => {
        alert(error);

        document.getElementById('mail').value = '';
        document.getElementById('password').value = '';
      });

    console.log('si sirvo');
  });

  title.textContent = 'Pet Registro';

  section.append(img, form1);
  form1.append(
    title,
    mailLabel,
    mail,
    passwordLabel,
    password,
    register,
    buttonReturn,
  );
  return section;
}

export default registro;
