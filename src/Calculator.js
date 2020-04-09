class Calculator {
  add(a, b) {
    return a + b;
  }

  privateSubtract(a, b) {
    return a - b;
  }
}

exports.Calculator = Calculator;

const calculator = new Calculator();

console.log(calculator.add(1, 2)); // 1. 정상 실행
console.log(calculator.privateSubtract(2, 1)); // 2. 정상 실행
console.log(calculator.multiply(3, 4)); // 3. 런타임상 오류 발생 - 없는 메서드
console.log(calculator.add('a', 'b')); // 4. 런타임상 버그 발생 - 'ab' 리턴
