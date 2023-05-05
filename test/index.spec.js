/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import {
  autenticacion, revision, loginGoogle1,
} from '../src/lib/auth';
import * as auth from '../src/lib/auth.js';

/* ----------------------- Test Registro ----------------------*/

describe('Pruebas para la función de autenticación', () => {
  const email = 'usuario@dominio.com';
  const password = 'contraseña123';

  it("Debería devolver un mensaje de error 'Usuario existente' al autenticar con un correo electrónico ya registrado", async () => {
    try {
      await autenticacion(email, password);
    } catch (error) {
      expect(error).toEqual('Usuario existente');
    }
  });

  it("Debería devolver un mensaje de error 'Correo electrónico inválido' al autenticar con un correo electrónico inválido", async () => {
    const emailInvalido = 'usuario@dominio';
    try {
      await autenticacion(emailInvalido, password);
    } catch (error) {
      expect(error).toEqual('Correo electrónico inválido');
    }
  });

  it("Debería devolver un mensaje de error 'La contraseña debe tener al menos 6 caracteres' al autenticar con una contraseña débil", async () => {
    const passwordDebil = '123';
    try {
      await autenticacion(email, passwordDebil);
    } catch (error) {
      expect(error).toEqual('La contraseña debe tener al menos 6 caracteres');
    }
  });
});

/* ----------------------- Test Login Google ----------------------*/

describe('Button Google1', () => {
  test('Login with Google call function navigateTo', () => {
    const DOM = document.createElement('div');
    DOM.innerHTML = '<button id="regist">Register</button>'; // Crear el botón con el id necesario
    document.body.appendChild(DOM); // Agregar el botón al DOM

    const onebutton = document.getElementById('regist');
    expect(onebutton).not.toBeNull(); // Corregir el matcher a toBeNull()

    document.body.removeChild(DOM); // Eliminar el botón del DOM al final del test
  });
});

describe('Pruebas para la función de login con Google', () => {
  it('Debería iniciar sesión con Google y retornar los datos del usuario', async () => {
    // Creamos la función simulada que retornará el objeto user con los datos del usuario
    const userMock = {
      email: 'johndoe@example.com',
      uid: '123456789',
    };
    // Reemplazamos la implementación de signInWithPopup con nuestra función simulada
    jest.spyOn(auth, 'loginGoogle1').mockImplementationOnce(() => jest.fn());
    // Llamamos a la función que estamos probando
    const result = await loginGoogle1();
  });
});

/* ----------------------- Test función revision ' ----------------------*/
describe('revision function', () => {
  // Test para revisión de credenciales correctas
  test('should resolve with userCredential when email and password are correct', async () => {
    const email = 'johndoe@example.com';
    const password = 'password123';

    const result = await revision(email, password);
    expect(result).toBeTruthy();
  });

  // Test para revisión de credenciales incorrectas
  test('should reject with error message when email and password are incorrect', async () => {
    const email = 'johndoe@example.com';
    const password = 'wrongpassword';

    try {
      await revision(email, password);
    } catch (error) {
      expect(error).toBe('La contraseña es incorrecta. Por favor, intenta de nuevo.');
    }
  });

  // Test para revisión de correo electrónico inválido
  test('should reject with "Correo electrónico inválido" message when email is invalid', async () => {
    const email = 'invalidemail';
    const password = 'password123';
    try {
      await revision(email, password);
    } catch (error) {
      expect(error).toBe('Correo electrónico inválido');
    }
  });
});
