import { signInWithEmailAndPassword } from 'firebase/auth';
import { autenticacion, revision } from '../src/lib/auth';

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

describe('Pruebas para la función de revisión de credenciales', () => {
  const email = 'usuario@dominio.com';
  const password = 'contraseña123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Debería resolver correctamente la promesa si las credenciales son correctas', async () => {
    signInWithEmailAndPassword.mockResolvedValueOnce({});
    await expect(revision(email, password)).resolves.toEqual({});
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), email, password);
  });

  it("Debería rechazar la promesa con el mensaje 'Correo electrónico inválido' si el correo electrónico es inválido", async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce({ code: 'auth/invalid-email' });
    await expect(revision(email, password)).rejects.toEqual('Correo electrónico inválido');
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), email, password);
  });

  it("Debería rechazar la promesa con el mensaje 'La contraseña es incorrecta. Por favor, intenta de nuevo.' si la contraseña es incorrecta", async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce({ code: 'auth/wrong-password' });
    await expect(revision(email, password)).rejects.toEqual('La contraseña es incorrecta. Por favor, intenta de nuevo.');
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), email, password);
  });

  it('Debería rechazar la promesa con el mensaje por defecto si ocurre un error diferente a los anteriores', async () => {
    signInWithEmailAndPassword.mockRejectedValueOnce({});
    await expect(revision(email, password)).rejects.toEqual('Ha ocurrido un error');
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(expect.anything(), email, password);
  });
});

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
