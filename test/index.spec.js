import { autenticacion } from '../src/lib/auth';

describe('Pruebas para la función de autenticación', () => {
  const email = 'usuario@dominio.com';
  const password = 'contraseña123';

  it("Debería devolver un mensaje de error 'Usuario existente' al autenticar con un correo electrónico ya registrado", async () => {
    await expect(autenticacion(email, password)).rejects.toEqual('Usuario existente');
  });

  it("Debería devolver un mensaje de error 'Correo electrónico inválido' al autenticar con un correo electrónico inválido", async () => {
    const emailInvalido = 'usuario@dominio';
    await expect(autenticacion(emailInvalido, password)).rejects.toEqual('Correo electrónico inválido');
  });

  it("Debería devolver un mensaje de error 'La contraseña debe tener al menos 6 caracteres' al autenticar con una contraseña débil", async () => {
    const passwordDebil = '123';
    await expect(autenticacion(email, passwordDebil)).rejects.toEqual('La contraseña debe tener al menos 6 caracteres');
  });
});
