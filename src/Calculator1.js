class Calculator {
  add(a, b) {
    return a + b;
  }

  doNotUseSubtract(a, b) {
    return a - b;
  }
}

const calculator = new Calculator();

console.log(calculator.add(1, 2));
console.log(calculator.doNotUseSubtract(1, 2));
console.log(calculator.multiply(3, 4));
console.log(calculator.add('a', 'b'));
