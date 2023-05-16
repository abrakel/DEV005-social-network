import {
  loginGoogle1,
  revision,
} from '../lib/auth';

function home(navigateTo) {

  const section = document.createElement('section');
  // Elementos
  const img = document.createElement('img');
  const form = document.createElement('form');
  form.className = 'form1';
  const title = document.createElement('h1');
  title.className = 'i-r-title';
  const division = document.createElement('div');
  division.setAttribute('class', 'divhome');  
  /* ----------------Imagenes -------------------------*/
  img.setAttribute('src', '../img/logo.jpg');
  img.setAttribute('alt', 'logo de Patitas.com');
  img.setAttribute('class', 'logo');  
  /* ----------------Registrarse-------------------------*/
  const register = document.createElement('button');
  register.textContent = 'Registrate ahora';
  register.setAttribute('class', 'register-b');
  register.addEventListener('click', () => {
    navigateTo('/registro');
  });  
  /* ------------------ Correo ---------------------*/
  const mailUser = document.createElement('label');
  const mail = document.createElement('input');
  mail.className = 'mail-input';
  mail.id = 'mailUser';
  mail.placeholder = 'usuario@dominio.com';
  mail.addEventListener('blur', () => {
    const email = mail.value;
    if (!email.endsWith('@gmail.com') && !email.endsWith('@hotmail.com')) {
      // eslint-disable-next-line no-alert
      alert('Introduzca una dirección de correo electrónico válida');
      mail.value = '';
    }
  });
  document.body.appendChild(mailUser);
  document.body.appendChild(mail);  
  /* ------------------ Contraseña ---------------------*/
  const divPassField = document.createElement('div');
  divPassField.className = 'div-password-home';
  const passUser = document.createElement('label');
  const divPass = document.createElement('div');
  divPass.className = 'div-pass-eye'
  const password = document.createElement('input');
  password.className = 'pass-input';
  password.id = 'password1';
  password.minLength = 6;
  password.maxLength = 10;
  password.type = 'password';
  password.placeholder = 'Ingrese contraseña';
  
  const showPasswordBtn = document.createElement('button');
  showPasswordBtn.setAttribute('class', 'showPasswordBtn-b');
  showPasswordBtn.innerHTML = '<i class="fa-solid fa-eye" style="color: #635994;"></i>'

  // Añadimos el botón a la etiqueta de la contraseña
  divPassField.append(passUser, divPass);
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

  /* ---------------- Iniciar sesión-------------------------*/
  const login = document.createElement('button');
  login.setAttribute('id', 'login-b');
  login.setAttribute('class', 'loginb');
  login.textContent = 'Iniciar sesión';
  mailUser.textContent = 'Correo electrónico:';
  passUser.textContent = 'Contraseña:';
  title.textContent = 'Patitas.com';
  login.addEventListener('click', (e) => {
    e.preventDefault();
    revision(mail.value, password.value)
      .then((user) => {
        navigateTo('/muro');
        // eslint-disable-next-line no-console
        console.log(user);
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Tienes un error', error);
        mail.value = '';
        password.value = '';
      });
  });  
  /* ----------------Iniciar con google-------------------------*/
  const loginGoogle = document.createElement('button');
  loginGoogle.textContent = 'Inicia sesión con Google';
  loginGoogle.setAttribute('id', 'loginGoogle-b');  loginGoogle.addEventListener('click', async (e) => {
    e.preventDefault();
    loginGoogle1().then(() => {
      navigateTo('/muro');
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
  });  section.append(img, form);
  form.append(
    title,
    mailUser,
    mail,
    divPassField,
    division,
    login,
    loginGoogle,
  );
  division.append(register);
  return section;
};

export default home;
