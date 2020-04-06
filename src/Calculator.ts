export class Calculator {
  public add(a: number, b: number) {
    return a + b;
  }

  public doNotUseSubtract(a: number, b: number) {
    return a - b;
  }
}

const calculator = new Calculator();

console.log(calculator.add(1, 2));
console.log(calculator.doNotUseSubtract(1, 2));
// console.log(calculator.multiply(3, 4));
// console.log(calculator.add('a', 'b'));
