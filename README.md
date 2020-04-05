# nodejs study

프로그라피 6기 nodejs 스터디 레포입니다. 이 스터디는 `Typescript`와 `express`를 활용한 서버 애플리케이션 제작을 목표로 하는 서버 기초 스터디입니다. node 버젼은 최신LTS인 12(작성일 기준 12.16.1)로 합니다. 컴퓨터에 없으다면 미리 준비해오기 바랍니다. 설치 방법은 각 OS별로 다르니 확인후에 설치하면 됩니다.([nodejs 공홈](https://nodejs.org/ko/)) 에디터는 국룰 [VSCODE](https://code.visualstudio.com/)를 기준으로 진행합니다.(코드 포맷 자동완성)

## Table of contents

1. [개발환경 셋팅하기](../../#1개발환경-셋팅하기)
   1. [Typescript](../../#i.Typescript)
   2. [lint](../../#ii.lint)
   3. [js와 ts 비교](../../#iii.js와-ts-비교)
   4. [테스트(jest)](../../#iv.테스트(jest))

2. 서버 프레임워크
   1. express
   2. lowdb 설치
   3. 첫번째 CRUD
   4. e2e 테스트

3. 데이터베이스 사용하기
   1. mariadb
   2. prisma 설치
   3. prisma 학습
   4. User 모델을 생성하고 로그인 기능 개발하기
   5. 암호화 모듈로 사용자의 정보 암호화 하기
   6. e2e 테스트 작성

4. 도커로 올려보기
   1. 가상화와 docker에 대해 이해하기
   2. docker 기초 실습
      1. Dockerfile 작성
      2. 이미지 빌드하기
      3. 컨테이너 생성하기
      4. 컨테이너랑 볼륨 만들기
      5. 컨테이너들끼리 연결하기
   3. docker를 여러개를 한번에 켜고 끄기
      1. docker-compose.yml 작성
      2. docker-compose 명령어 쓰기
      3. docker로 만든 서비스 올리기(데이터베이스 포함)

5. ElasticBeanstalk로 서비스 올리기
   1. user 권한 생성하기
   2. eb 설치하기 또는 도커로 해보기
   3. eb init
   4. eb create
   5. eb deploy

***

## 1.개발환경 셋팅하기

NodeJS 개발시에 개발환경은 정답이 없습니다.~~(시키는대로만 하면...실행 안됨)~~ 모두들 원하는(?) 상태에서 개발을 진행하시면 됩니다. 다 알아서 상황에 맞게 만들면 됩니다! 이 스터디에서는 `Typescript`, `테스트`, `express` 각각 설치하여 사용해봅니다.

### i.Typescript

Typescript는 nodejs에서 타입을 사용할 수 있게 도와주는 라이브러리입니다. javascript 코딩 중에는 타입에 대해서 신경쓸 필요가 없기 때문에 마구 작성할 수 있지만, 이렇게 작성하다보면 런타임시 발생한 에러를 잡는 데에 엄청난 시간을 쏟을 수 있습니다. 오류 발생을 코드 작성시에 미리 감지할 수 있도록 도와줍니다. 타입스크립트 공식문서에서 보면 [static type checker](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html#typescript-a-static-type-checker)라고 표현하고 있습니다.

Typescript는 컴파일러(?)역할을 하는 라이브러리를 받아서 실행할 수 있습니다. `npm i --save-dev typescript` 로 받을 수 있습니다. ([typescript 설치](https://www.npmjs.com/package/typescript))

### ii.lint

lint는 code-style 규칙을 정해서, 규칙에 맞지 않으면 맞지 않은 것을 알려주거나 `fix` 명령어를 통해 한번에 포맷에 맞게 맞춰서 코드의 일관성을 유지하는 강력한 도구 입니다. 젯브레인 에디터(안드로이드 스튜디오, 인텔리제이 등)을 상요하시는 분들이라면 `Ctrl + Alt + L`을 사용하는 것이라고 생각하면 됩니다.(젯브레인 코드스타일이 있음) 이 스터디에서는 VSCODE를 사용하기 때문에, lint를 도와주는 라이브러리 설치가 필요합나다. [eslint](https://www.npmjs.com/package/eslint)를 받아주세요.(`npm i --save-dev eslint`) code-style은 회사마다 각기 다른데, 이 스터디에서는 구글에서 발표한 코드스타일을 따라보겠습니다. [google/gts](https://github.com/google/gts) 를 사용하겠습니다.(`npm run --save-dev gts`)

### iii.js와 ts 비교

js와 ts의 코드 스타일을 비교해봅니다. 다음은 Calculator 클래스를 사용해서 화면에 결과값을 출력하는 예제입니다.

```javascript
class Calculator {
   add(a, b) {
      return a + b;
   }
   doNotUseSubtract(a, b) {
      return a - b;
   }
}

const calculator = new Calculator();
console.log(calculator.add(1, 2)); // 1. 정상 실행
console.log(calculator.doNotUseSubtract(2, 1)); // 2. 정상 실행
console.log(calculator.add('a', 'b')); // 3. 런타임상 오류 발생
```

javascript는 코드 작성중에서는 오류를 볼 수 없습니다. eslint를 사용했을 때 힌트를 얻을 수도 있습니다. 런타임상에서는 오류가 발생할 수 있습니다.

```typescript
class Calculator {
   public add(a: number, b: number) {
      return a + b;
   }
   private doNotUseSubtract(a: number, b: number) {
      return a - b;
   }
}

const calculator = new Calculator();
console.log(calculator.add(1, 2)); // 1. 정상 실행
console.log(calculator.doNotUseSubtract(2, 1)); // 2. 코드상 오류로 걸림
console.log(calculator.add('a', 'b')); // 3. 코드상 오류로 걸림
```

typescript로 작업을 하면 각 메서드에 받을 변수의 타입을 지정할 수 있습니다. 또한 접근지정자(public, private, protected)를 지정할 수 있어서 캡슐화를 구현할 수 있습니다. 코드 상에서 발생할 수 있는 에러를 미리 알려주기 때문에 코드의 에러율이 현저히 줄어드는 것을 경험할수 있습니다. 처음 코딩을 접하는 사람들에겐 타입에 대해서 이해하는 것부터 힘든 점들이 있겠지만, 어느정도 익숙해지고나서는 코딩이 굉장히 편해집니다. 코드얼마나 까---ㄹ끔 합니까?

### iv.테스트(jest)

TDD는 어렵다는 얘기를 많이 합니다. TDD가 어려운 것은 분명합니다. 저도 테스트가 꼭 필요하다곤 생각하지만, TDD는 하나의 기법이지 필수는 아니라고 생각합니다. 이 스터디에서는 이미 개발된 기능에 대한 테스트를 함께 진행합니다. 테스트를 구현해두었을 때의 장점은 첫번째 디버깅이 훨씬 용이해집니다. 포스트맨으로 날려보고 데이터 확인하고, 서버 로그 찍어서 어디서 데이터가 이상해지는지 확인하고 이런 과정을 할 필요가 없습니다.(console.log 안녕~) 둘째로, 기능을 추가했을 때, 이전 기능에 대한 테스트를 통해서 버그 수정이 낳는 버그를 막을 수 있습니다. 테스트는 프로덕션에서 날 에러를 사전에 미리 잡자 라는 취지입니다. 하지만, TDD를 하면 장점은 미리 요청방법과 응답을 정의하여, 프론트엔드(앱, 웹)에서는 미리 기능을 개발 할 수 있고 테스트에 맞는 개발을 진행하면 되기 때문에 프론트에서 서버가 완성되기를 기다리는 공백상태를 없앨 수 있습니다.

이 스터디에서는 테스트 프레임워크로 페이스북에서 개발한 `jest`를 사용합니다. [jest 공홈](https://jestjs.io)에서 확인할 수 있고, 다음의 명령어로 설치가 가능합니다.`npm i --save-dev jest`, 또 우리는 typescript 환경을 사용하기 때문에 `ts-jest`도 설치해야합니다. `npm i --save-dev ts-jest`, [ts-jest 설명](https://github.com/kulshekhar/ts-jest)
