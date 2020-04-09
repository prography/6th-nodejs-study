export class Calculator {
  public add(a: number, b: number) {
    return a + b;
  }

  private subtract(a: number, b: number) {
    return a - b;
  }
}

const calculator = new Calculator();
console.log(calculator.add(1, 2)); // 1. 정상 실행
console.log(calculator.subtract(2, 1)); // 2. 코드상 오류로 걸림 - private 메서드 접근 불가
console.log(calculator.multiply(3, 4)); // 3. 코드상 오류로 걸림 - 없는 메서드
console.log(calculator.add('a', 'b')); // 4. 코드상 오류로 걸림 - 파라미터 타입 불일치
