# Memo Project

## 개요
간단한 메모 관리 앱
백엔드는 Spring Boot 3 + JPA
프론트는 React + Axios 기반입니다

## 주요 기능
- JWT 로그인/회원가입
- 메모 CRUD(중요, 완료 상태 등)
- Docker Compose로 백엔드와 DB연동
- Swagger API 문서 자동화
- 시간대 동기화 문제 해결

## 기술 스택
- Spring Boot 3
- MySQL(Docker)
- Axios/Context API
- Swagger(Springdoc)
- Docker Compose

## Postman API Test
- [random-memo.postman_collection.json](./docs/random-memo.postman_collection.json)
- [random-memo-env.json](./docs/random-memo-env.json)
- Import to Postman → Run “users/login” → Test all memo APIs

## 이후 계획
- UI 개선(컴포넌트화, 스타일링)
- JWT 재발급
- README 추가
