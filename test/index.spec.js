/* // importamos la funcion que vamos a testear
import { myFunction } from '../src/lib/index';

describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof myFunction).toBe('function');
  });
});
 */
import logMicrosoft from '../src/components/microsoftlogin.js';

describe('singUp', () => {
  test('is a function', () => {
    expect(typeof logMicrosoft).toBe('function');
  });
});
