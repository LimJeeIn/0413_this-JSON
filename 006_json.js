// - JSON.parse(): JSON문자열을 자바스크립트 객체로 변환합니다.(문자열 => 객체)
// - JSON.stringify() : 자바스크립트 객체를 JSON문자열로 변환합니다.(객체 => 문자열)

const json = '{"result":true, "count":42}';
const obj = JSON.parse(json);
console.log(obj); // {result: true, count: 42}

const json = '[1, 2, 3]';
const obj = JSON.parse(json);
console.log(obj); //  [1, 2, 3]

const json = '[1, 2, [1, 2, 3]]';
const obj = JSON.parse(json);
console.log(obj);

const json = { result: true, count: 42 };
const s = JSON.stringify(json); // {"result":true,"count":42}
s;

// 깊은 복사
let l = [10, 20, 30];
let a = JSON.parse(JSON.stringify(l)); // 스트링으로 바꼈다가 어레이로 바뀐것 -> 완전 다른 주소값을 가진 10,20,30을 만들어낸다
a[0] = 1000;

console.log(l);

// error
let l = [10, 20, 30];
let a = JSON.parse(`${l}`);
a[0] = 1000;

console.log(l);
