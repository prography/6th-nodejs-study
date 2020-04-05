# nodejs study

프로그라피 6기 nodejs 스터디 레포입니다. 이 스터디는 `Typescript`와 `express`를 활용한 서버 애플리케이션 제작을 목표로 하는 서버 기초 스터디입니다. 에디터는 국룰 VSCODE를 기준으로 진행합니다.

## Table of contents

1. [개발환경 셋팅하기](#1개발환경 셋팅하기)
   1. Typescript(>3.8.*) 설치
   2. google/gts설치
   3. 메서드 작성하기
   4. 테스트 라이브러리 설치(jest)
   5. 테스트 작성

2. 서버 프레임워크 작성
   1. express 설치
   2. lowdb 설치
   3. CRUD 메서드 작성
   4. CRUD e2e 테스트 작성

3. 데이터베이스 접근 하기
   1. prisma 설치
   2. prisma 학습
   3. User 모델을 생성하고 로그인 기능 개발하기
   4. 암호화 모듈로 사용자의 정보 암호화 하기
   5. e2e 테스트 작성

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
