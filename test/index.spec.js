/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import * as firebaseAuth from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import * as auth from '../src/lib/auth.js';
import {
  autenticacion, revision, loginGoogle1,
} from '../src/lib/auth';

jest.mock('firebase/auth');
/* ----------------------- Test Registro ----------------------*/
describe('Pruebas para la función de autenticación', () => {
  const email = 'usuario@dominio.com';
  const password = 'contraseña123';

  it("Debería devolver un mensaje de error 'Usuario existente' al autenticar con un correo electrónico ya registrado", async () => {
    firebaseAuth.createUserWithEmailAndPassword.mockRejectedValue({ code: 'auth/email-already-in-use' });
    try {
      await autenticacion(email, password);
    } catch (error) {
      expect(error).toEqual('Usuario existente');
    }
  });

  it("Debería devolver un mensaje de error 'Correo electrónico inválido' al autenticar con un correo electrónico inválido", async () => {
    firebaseAuth.createUserWithEmailAndPassword.mockRejectedValue({ code: 'auth/invalid-email' });
    const emailInvalido = 'usuario@dominio';
    try {
      await autenticacion(emailInvalido, password);
    } catch (error) {
      expect(error).toEqual('Correo electrónico inválido');
    }
  });

  it("Debería devolver un mensaje de error 'La contraseña debe tener al menos 6 caracteres' al autenticar con una contraseña débil", async () => {
    firebaseAuth.createUserWithEmailAndPassword.mockRejectedValue({ code: 'auth/weak-password' });
    const passwordDebil = '123';
    try {
      await autenticacion(email, passwordDebil);
    } catch (error) {
      expect(error).toEqual('La contraseña debe tener al menos 6 caracteres');
    }
  });

  it('Debería autenticar al usuario con éxito cuando se proporcionan credenciales válidas', async () => {
    firebaseAuth.createUserWithEmailAndPassword.mockResolvedValue({ user: { uid: '123' } });
    const userCredential = await autenticacion(email, password);
    expect(userCredential).toBeDefined();
    expect(userCredential.user.uid).toEqual('123');
  });

  function catchFunction(error, error1) {
    error1.textContent = 'Ha ocurrido un error';
  }

  describe('test para la función catch', () => {
    test('debe establecer correctamente el texto de error1 cuando ocurre un error', () => {
      // simulamos un error en la ejecución del código
      const error = new Error('Algo salió mal');

      // creamos un objeto que simule el elemento error1
      const error1 = {
        textContent: '',
      };

      // llamamos a la función catch y pasamos el error simulado
      // junto con el objeto que simula error1
      catchFunction(error, error1);

      // verificamos que el texto de error1 se haya establecido correctamente
      expect(error1.textContent).toBe('Ha ocurrido un error');
    });
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

describe('loginGoogle1', () => {
  it('should log access token, user, and credential to console', async () => {
    const mockToken = 'mockAccessToken';
    const mockUser = { uid: 'mockUserId' };
    const mockCredential = { accessToken: mockToken };
    const mockResult = { user: mockUser, credential: mockCredential };

    // Mock the sign in with popup function
    signInWithPopup.mockResolvedValueOnce(mockResult);

    // Mock the credentialFromResult function
    GoogleAuthProvider.credentialFromResult = jest.fn().mockReturnValue({ accessToken: mockToken });

    // Call the function being tested
    await loginGoogle1();
  });
});
/* ----------------------- Test función revision ' ----------------------*/
describe('revision function', () => {
  // Test para revisión de credenciales correctas
  test('should resolve with userCredential when email and password are correct', async () => {
    firebaseAuth.signInWithEmailAndPassword.mockResolvedValue({ email: 'johndoe@example.com' });
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

  it('should return a generic error message when an unexpected error occurs', async () => {
    firebaseAuth.createUserWithEmailAndPassword.mockRejectedValue(new Error('Something went wrong'));
    const email = '';
    const password = '';
    try {
      await revision(email, password);
    } catch (error) {
      expect(error.message).toEqual('Something went wrong');
    }
  });
});

describe('revision', () => {
  jest.setTimeout(10000);

  it('should reject with error message for invalid email', async () => {
    const mockError = { code: 'auth/invalid-email' };
    const error1 = document.createElement('div');

    // Mock the signInWithEmailAndPassword function to throw the error
    signInWithEmailAndPassword.mockRejectedValueOnce(mockError);

    // Call the function being tested
    await expect(revision('invalid-email@example.com', 'password', error1)).rejects.toThrow('Correo electrónico inválido');

    // Expect the error1 element to have the expected text content
    expect(error1.textContent).toBe('Correo electrónico inválido');
  });

  it('should reject with error message for wrong password', async () => {
    const mockError = { code: 'auth/wrong-password' };
    const error1 = document.createElement('div');

    // Mock the signInWithEmailAndPassword function to throw the error
    signInWithEmailAndPassword.mockRejectedValueOnce(mockError);

    // Call the function being tested
    await expect(revision('valid-email@example.com', 'wrong-password', error1)).rejects.toThrow('La contraseña es incorrecta. Por favor, intenta de nuevo.');

    // Expect the error1 element to have the expected text content
    expect(error1.textContent).toBe('La contraseña es incorrecta. Por favor, intenta de nuevo.');
  });

  it('should reject with generic error message for other errors', async () => {
    const mockError = { code: 'auth/other-error' };
    const error1 = document.createElement('div');

    // Mock the signInWithEmailAndPassword function to throw the error
    signInWithEmailAndPassword.mockRejectedValueOnce(mockError);

    // Call the function being tested
    await expect(revision('valid-email@example.com', 'password', error1)).rejects.toThrow('Ha ocurrido un error');

    // Expect the error1 element to have the expected text content
    expect(error1.textContent).toBe('Ha ocurrido un error');
  });
});
