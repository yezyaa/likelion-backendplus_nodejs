// 동기처리.js
// 변수 선언이 없다. 그래도 선언하고 싶다 var 또는 let을 사용한다.
// var(old ver.) let(new ver.) -> 가급적 let을 사용해라
// var -> 호이스팅 문제가 발생, 변수가 스코프룰 처리가 안됨
let fs = require("fs"); // 외부에 있는 fs 모듈을 사용하겠다.
// 자바스크립트로 파일을 읽는다. readFile(비동기 모드), readFileSync(동기 모드)가 있다.
let result = fs.readFildSync("./test.txt", encode="utf-8");
console.log(result);