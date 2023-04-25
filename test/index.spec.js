// importamos la funcion que vamos a testear
import { autenticacion } from '../src/lib/';

describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof myFunction).toBe('function');
  });
});
