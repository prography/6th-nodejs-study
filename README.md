# nodejs study

프로그라피 6기 nodejs 스터디 레포입니다. 이 스터디는 `Typescript`와 `express`를 활용한 서버 애플리케이션 제작을 목표로 하는 서버 기초 스터디입니다. node 버젼은 latest LTS인 v12(작성일 기준 v12.16.1)을 사용합니다. 컴퓨터에 없다면 미리 준비해오기 바랍니다. 설치 방법은 각 OS별로 다르니 [nodejs 공식 홈페이지](https://nodejs.org/ko/)에서 확인후에 설치하면 됩니다. 에디터는 국룰 [vscode](https://code.visualstudio.com/)를 기준으로 진행합니다.

## Table of contents

1. [개발환경 셋팅하기](../../#1개발환경-셋팅하기)
   1. [Typescript](../../#itypescript)
   2. [lint](../../#iilint)
   3. [js와 ts 비교](../../#iiijs와-ts-비교)
   4. [테스트(jest)](../../#iv테스트jest)

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
   1. IAM으로 권한 생성하기
   2. eb 설치하기 또는 도커로 해보기
   3. eb init
   4. eb create
   5. eb deploy

***

## 1.개발환경 셋팅하기

NodeJS 개발 환경은 사실 nodejs만 설치하면 끝입니다.~~꼭 블로그 따라하면 실행 안됨~~ 마냥 따라 설치하면 되더라. 보다는 왜 설치하는지 알고 설치를 하면 좋습니다. 이 스터디에서는 기본 node에서 나아가 타입을 적용합니다. 다음의 스크립트 순서대로 `Typescript`, `google/gts`, `jest` 각각 설치합니다.

### i.Typescript

타입스크립트(Typescript)는 nodejs에서 타입을 사용할 수 있게 도와주는 라이브러리입니다. javascript 코딩 중에는 타입에 대해서 신경쓸 필요가 없기 때문에 자유를 느끼며 마구마구 작성할 수 있지만, 작성하다보면 런타임에서 발생한 에러를 잡는 데에 엄청난 시간을 쏟는 대참사를 경험 할 수 있습니다.(특히 오타로 발생하는 오류) 타입을 추가하면, 코드 작성 단계에서 런타임에 발생할 수 있는 오류를 미리 감지할 수 있습니다. 타입이 이걸 해냅니다. 참고로 타입스크립트 공식문서에서 보면 [static type checker](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html#typescript-a-static-type-checker)라고 표현하고 있습니다.

타입스크립트를 사용하려면, 컴파일러 역할을 하는 라이브러리를 받아야 합니다. [Typescript](https://www.npmjs.com/package/typescript)를 받아주세요. 설치 후에는 컴파일 설정 파일인 `tsconfig.json`을 생성하면 준비가 끝납니다.

```bash
# typescript 설치
npm i --save-dev typescript

# tsconfig.json 초기 파일 생성
npx tsc --init

# 컴파일
npx tsc
```

코드 작업은 자바스크립트 확장자인 `.js` 대신에 `.ts`를 사용합니다. `.ts` 파일에 코드를 작성한 후에 `npx tsc` 명령어를 이용하면 `.js`파일로 컴파일 할 수 있습니다. 엥? 열심히 타입스크립트로 썼는데 왜 다시 자바스크립트로 돌아가죠? 하고 의문점을 느낄 수도 있는데, 타입스크립트는 코드 작성에 도움을 주는 라이브러리고 결국 런타임은 ~~node~~JS 입니다. 그래서 자바스크립트로 돌아가야합니다.코드를 깔끔하게 사용하기 위해 타입스크립트를 사용하는 것입니다.

타입스크립트를 쓰다보면 라이브러리를 못찾는 오류가 발생합니다. 아주 잘아는 서버 프레임워크인 `express`를 쓸 때도 라이브러리를 못찾을 수 있습니다. 이럴 때는  `@types/express` 를 설치하면 사용할 수 있습니다. `@types/` 뒤에 사용하려는 라이브러리 이름을 써서 받으면 해당 라이브러리의 타이핑 파일을 받을 수 있습니다. 타이핑 파일은 자바스크립트 라이브러리를 타입스크립트 처럼 사용할 수 있게 도와줍니다. `@types/` 로 시작하는 것은 타입스크립트에서 공식지원하는 라이브러리로 보시면됩니다. 최근에는 라이브러리들 마다 타이핑을 제공해서 받지 않아도 사용가능하기도 합니다. 간혹가다 아예 타이핑이 제공되지 않는 라이브러리들이 있는데, 타입스크립트 사용시에는 해당 라이브러리를 안쓰기를 적극 권장합니다. 같은 기능을 하는 다른 라이브러리를 사용할 수 있습니다. 아니면, 직접 타이핑 파일을 만들어서 사용할 수 있습니다. `**.d.ts`라는 네이밍으로 사용합니다. 타이핑을 직접 만드는 방법은 [타입스크립트 공식 홈페이지](https://www.typescriptlang.org/docs/handbook/declaration-files/templates.html)에서 찾아보세요.

### ii.lint

lint는 code-style 규칙을 정해서, 규칙에 맞지 않으면 맞지 않은 것을 알려주거나 `npx eslint --fix` 명령어를 통해 한번에 강제로 맞춰서 코드의 일관성을 유지하는 강력한 도구 입니다. 젯브레인 에디터(안드로이드 스튜디오, 인텔리제이 등)을 사용하시는 분들이라면 `Ctrl + Alt + L`을 사용하는 것이라고 생각하면 됩니다.(젯브레인 코드스타일이 있음) 이 스터디에서는 `VSCODE`를 사용하기 때문에, lint를 도와주는 라이브러리 설치가 필요합나다. [eslint](https://www.npmjs.com/package/eslint)와 [prettier](https://www.npmjs.com/package/prettier)를 받아주세요.

```bash
# eslint, prettier 설치
npm run --save-dev eslint prettier

# eslint 초기화
npx eslint --init

# 자동 픽스
npx eslint --fix

```

매번 cli 명령어로 수정하기 귀찮다면, vscode 익스텐션을 설치하여 파일 저장시에 자동으로 맞출 수도 있습니다.

- [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### iii.js와 ts 비교

js와 ts의 코드 스타일을 비교해봅니다. 다음은 계산기 기능을 가지고 있는 기본적인 Calculator 클래스를 사용해서 화면에 결과값을 출력하는 예제입니다.

```javascript
class Calculator {
   add(a, b) {
      return a + b;
   }
   privateSubtract(a, b) {
      return a - b;
   }
}

const calculator = new Calculator();
console.log(calculator.add(1, 2)); // 1. 정상 실행
console.log(calculator.privateSubtract(2, 1)); // 2. 정상 실행
console.log(calculator.multiply(3, 4)); // 3. 런타임상 오류 발생 - 없는 메서드
console.log(calculator.add('a', 'b')); // 4. 런타임상 오류 발생 - 'ab' 리턴
```

자바스크립트는 실행하기 전까지 오류가 날지 확인이 힘듭니다. eslint를 사용했을 때 힌트를 얻을 수도 있습니다만, 런타임상에서의 오류를 모두 잡기엔 턱없이 부족합니다.

```typescript
class Calculator {
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
console.log(calculator.multiply(3, 4)) // 3. 코드상 오류로 걸림 - 없는 메서드
console.log(calculator.add('a', 'b')); // 4. 코드상 오류로 걸림 - 파라미터 타입 불일치
```

타입스크립트로 작업을 하면 각 메서드에 받을 변수의 타입을 지정할 수 있습니다. 또한 접근지정자(public, private, protected)를 지정할 수 있어서 캡슐화를 구현할 수 있습니다. 코드 상에서 발생할 수 있는 에러를 미리 알려주기 때문에 코드의 에러율이 현저히 줄어드는 것을 경험할수 있습니다. 처음 코딩을 접하는 사람들에겐 타입에 대해서 이해하는 것부터 힘든 점들이 있겠지만, 어느정도 익숙해지고나서는 코딩이 굉장히 편해집니다.

### iv.테스트(jest)

이 스터디에서는 이미 개발된 기능에 대한 테스트를 진행합니다. 테스트를 알고 사용했을 때의 장점은 첫번째 **디버깅이 훨씬 용이**해집니다. 포스트맨으로 날려보고 데이터 확인하고, 서버 로그 찍어서 어디서 데이터가 이상해지는지 확인하고 이런 과정을 할 필요가 없습니다.(console.log 안녕~) 둘째로 기능을 추가하거나 버그를 수정했을 때, 수정이 낳는 버그를 막을 수 있습니다. 버그를 수정하다보면 잘되던 코드에서 버그가 발생하는 현상을 경험하기도 하는데, 배포 하기 전에 버그가 있는지 확인할 수가 있습니다. 세번째로 TDD(테스트 주도 개발)에 더 가까워질 수 있습니다.

좀 더 철저한 e2e(엔드 투 엔드, 서버에 요청에 대한 응답을 테스트) 테스트를 미리 작성해두고 개발을 하면 프론트엔드(앱, 웹)에서는 어떻게 요청을 보내고 응답이 어떻게 나오는지를 미리 알 수 있기 때문에 프론트에서 서버가 완성되기 기다리는 개발 공백을 없앨 수 있습니다.

이 스터디에서는 테스트 프레임워크로 페이스북에서 개발한 `jest`를 사용합니다.

- [jest](https://jestjs.io)
- [ts-jest(타입스크립트 지원 라이브러리)](https://github.com/kulshekhar/ts-jest)

```bash
# jest, ts-jest 설치
npm install --save-dev jest ts-jest
```

테스트 프레임워크를 설치하고 끝이 아닙니다. vscode에서는 테스트 실행스크립트를 작성해야 에디터에서 실행하고 디버깅 툴을 사용할 수 있습니다.

다음의 스크립트를 추가 해야합니다.

`.vscode/launch.json`

```javascript
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest All test files",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": ["--runInBand"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true,
      "windows": {
        "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      },
    }, {
      "type": "node",
      "request": "launch",
      "name": "Jest Current File",
      "program": "${workspaceFolder}/node_modules/.bin/jest",
      "args": [
        "${fileDirname}/${fileBasenameNoExtension}",
        "--config",
        "jest.config.js"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "disableOptimisticBPs": true,
      "windows": {
        "program": "${workspaceFolder}/node_modules/jest/bin/jest",
      },
    }
  ]
}

```

***
