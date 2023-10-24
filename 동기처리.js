// 동기처리.js
// 변수 선언이 없음. 그래도 선언하고 싶다면 var또는 let 사용
// var - old 버전, let - new 버전. 가급적 let 사용 권유
// var - 호이스팅 문제 발생. 호이스팅 : 원래 변수는 한번 선언하면 다시 선언 못함. 변수가 스코프룰 처리가 안됨.

let fs = require("fs"); // 외부에 있는 fs 모듈을 사용하겠다.

// 자바스크립트로 파일을 읽을 때 readFile, readFileSync라는 함수가 있음
// readFile : 비동기 모드로 읽음.
let result = fs.readFileSync("./test.txt", encode="utf-8")
console.log(result);
console.log("-------완료-------");