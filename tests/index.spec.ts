import { Calculator } from '../src/Calculator';

describe('test start', () => {
  const calculator = new Calculator();
  test('calculator.add', () => {
    expect(calculator.add(1, 2)).toBe(3);
  });
});
