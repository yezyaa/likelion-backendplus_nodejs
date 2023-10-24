// JSON => 자바의 HashMap, 파이썬 Dict, C# Dict
// 배열은 인덱스로 값에 접근하는데 JSON은 키와 값 쌍으로 저장해서, 키를 이용해 값을 접근하는 방식이다.
// 키와 값 쌍의 형태로 저장한다. {"키1":"값1", "키2":"값2"}, 키 값은 문자열이나 심볼 타입만 가능하다.
// 값 타입은 아무거나 심지어 함수까지 가능하다.
// 자바스크립트는 키 값에 "", '', 혹은 아무 것도 안 붙여도 가능하다. ex) "name", 'name', name 상관없다.
// Backend, Frontend하고 데이터를 주고 받을 때 JSON 형태로 주고 받는다. 그러나 형태가 JSON 객체인 것지 실제 JSON 객체는 아니다.
let person = {"name":"홍길동", "age":21, "phone":"010-0000-0000"};
console.log(person.name);
console.log(person["name"]);

// 객체배열
let persons = [
    {"name":"홍길동", "age":12, "phone":"010-0000-1111"},
    {"name":"임꺽정", "age":13, "phone":"010-0000-2222"},
    {"name":"장길산", "age":44, "phone":"010-0000-3333"},
    {"name":"이예지", "age":15, "phone":"010-0000-4444"},
    {"name":"삼예지", "age":16, "phone":"010-0000-5555"}
];

persons.forEach((p) => {
    console.log(p.name, p.age, p.phone);
});

console.log("-----------------")
// 나이가 30 이상만 추출하기
persons.filter((obj) => obj.age >= 30)
    .forEach((p) => {
        console.log(p.name, p.age, p.phone);
    });

// 이름에 길자가 들어가는 사람
console.log("이름에 길자가 들어가는 사람");
persons.filter((obj) => obj.name.includes("길"))
    .forEach((p) => {
        console.log(p.name, p.age, p.phone);
    });

// 정렬 문자나, 숫자나 JSON 객체를 주면 객체와 객체를 비교할 수는 없다.
// 데이터 비교 함수를 전달해야 한다. 매개변수가 두 개의 객체를 주고
persons.sort((a, b) => a.age - b.age); // 0보다 큰 값 | 0 | 0보다 작은 값
console.log(persons);

console.log("-------------이름순으로 정렬-------------");
persons.sort((a, b) => a.name.localeCompare(b.name)); // 0보다 큰 값 | 0 | 0보다 작은 값
console.log(persons);

let scores = [
    {"name":"홍길동", "kor":90, "eng":80, "mat":80},
    {"name":"임꺽정", "kor":100, "eng":100, "mat":100},
    {"name":"장길산", "kor":80, "eng":80, "mat":80},
    {"name":"조승연", "kor":70, "eng":70, "mat":70},
    {"name":"김성훈", "kor":60, "eng":80, "mat":60},
    {"name":"임재범", "kor":100, "eng":80, "mat":80}
]

// 1. 문제1. map 함수를 사용하여 총점(total) 필드와 평균(avg) 필드를 추가하세요.
scores.map(s => {
    s.total = s.kor + s.eng + s.mat;
    s.avg = s.totla/3.0;
    return s; // 리턴 반드시 해줘야 함
})

// 2. 문제2. 총점을 기준으로 내림차순 정렬하여 출력하세요.
scores.sort((s1, s2) => s2.total - s1.total)
    .forEach((s) => {
        console.log(s.name, s.total, s.avg);
    });

// 3. 문제3. 평균이 80 이상인 학생들의 명단을 출력하세요.
scores.filter(s => s.avg >= 80)
    .forEach((s) => console.log(s.name));