// this(***)
// this 란 ? 자신을 호출한 객체, 자신이 생성할 객체
// 객체를 가리키는 자기 참조 변수이다

function a() {
  console.log(this);
}
a(); // window를 호출

function b() {
  console.log('hello world');
}
b();
window.b(); // window를 호출, window가 b를 호출하고 있는것, . 앞에 있는 것을 출력한다

let myObj = {
  val1: 100,
  func1: function () {
    console.log(this);
    // this가 누구일까?
    // 찍어보면 됩니다. console.log
    // 1. func1
    // 2. myObj
    // 3. window
  },
};

myObj.func1(); // myObj를 호출

/////////////////////
// this는 자기 자신을 호출한 것을 부르기때문에 항상 달라진다

let myObj = {
  val1: 100,
  func1: function () {
    console.log(this);
  },
};

let test = myObj.func1;
test();

////////////////////

// this가 어려운 이유는 this를 포함하고 있는 객체가 있는 위치에 따라 this의 의미가 달라지기 때문입니다.
// bind를 포함한 예외사항이 있습니다.

function sayName() {
  console.log(this);
}

var c = {
  hello: 'world',
  say: sayName,
};

var b = {
  // var b = {c}
  c: c,
};

var a = {
  // var a = {b}
  b: b,
};

// 문제를 조금 더 꼬아보겠습니다.
function sayName() {
  //  sayName을 호출하는게 window 기 때문에 this는 window
  console.log(this);
}

var c = {
  hello: 'world',
  say: sayName, // say가 sayName을 가르키는게 아니라 그 안에 함수 내용을 가르킨다
};

var b = {
  // var b = {c}
  c: c,
  say: sayName,
};

var a = {
  // var a = {b}
  b: b,
  say: sayName,
};
console.log(a.b.say()); // b
console.log(a.say()); // a
console.log(a.b.c.say()); // c

/// 추가 예제 ///
var name = 'jeein';

function sayName() {
  console.log(this.name); // window.name
}

console.log(sayName); // jeein

let peter = {
  name: 'Peter Parker',
  say: sayName,
};

let bruce = {
  name: 'Bruce Wayne',
  say: sayName,
};

peter.say(); // 'Peter Parker'
bruce.say(); // 'Bruce Wayne'

////
// 게임 공격 동작 예제
function attackBeam() {
  // 레이저 공격 , // 20씩 마이너스 됨
  this.hp -= 20;
}

let jombi = {
  name: 'jombi',
  damaged: attackBeam,
  hp: 10000,
  power: 2,
};

let thanos = {
  name: 'thanos',
  damaged: attackBeam,
  hp: 1000,
  power: 100,
};

jombi.damaged();
jombi;

/////

function attackBeam() {
  // 레이저 공격
  this.hp -= 20;
}

function attackKnife() {
  // 칼공격
  this.hp -= 5;
}

let jombi = {
  name: 'jombi',
  damaged1: attackBeam,
  damaged2: attackKnife,
  hp: 10000,
  power: 2,
};

let thanos = {
  name: 'thanos',
  damaged: attackBeam,
  hp: 1000,
  power: 100,
};

jombi.damaged1(); // Beam
jombi.damaged2(); // Knife
jombi.hp;

/////

function attackBeam() {
  // 레이저 공격
  // this.hp -= 20
  console.log(this);
}

function attackKnife() {
  // 칼공격
  // this.hp -= 5
  console.log(this);
}

let jombi = {
  name: 'jombi',
  damaged: [attackBeam, attackKnife],
  hp: 10000,
  power: 2,
};

let thanos = {
  name: 'thanos',
  damaged: attackBeam,
  hp: 1000,
  power: 100,
};

jombi.damaged[0](); // Beam
jombi.damaged[1](); // Knife
// jombi.hp

///////
/* this 사용 예시 */

let 호텔 = [
  {
    이름: '하나호텔',
    위치: '제주도 제주시 001',
    가격: { A: 50000, B: 30000, C: 15000 },
    방의개수: 50,
    예약자수: 25,
    남은방의개수: function () {
      return this.방의개수 - this.예약자수;
    },
  },
  {
    이름: '둘호텔',
    위치: '제주도 제주시 002',
    가격: { A: 100000, B: 60000, C: 30000 },
    방의개수: 100,
    예약자수: 30,
    남은방의개수: function () {
      return this.방의개수 - this.예약자수;
    },
  },
  {
    이름: '셋호텔',
    위치: '제주도 제주시 003',
    가격: { A: 80000, B: 50000, C: 30000 },
    방의개수: 120,
    예약자수: 80,
    남은방의개수: function () {
      return this.방의개수 - this.예약자수;
    },
  },
];
console.log(호텔[0].남은방의개수());
console.log(호텔[1].남은방의개수());
console.log(호텔[2].남은방의개수());

/////

// https://velog.io/@proshy/JS-%EC%83%81%ED%99%A9%EC%97%90-%EB%94%B0%EB%A5%B8-this-%EB%B0%94%EC%9D%B8%EB%94%A9
function sayName() {
  console.log(this);
}

var c = {
  hello: 'world',
  say: sayName,
};

var b = {
  c: c,
};

var a = {
  b: b,
};

a.b.c.say();

function a() {
  console.log(this);
  function b() {
    console.log(this);
    function c() {
      console.log(this);
    }
    c();
  }
  b();
}
a();
// a, b, c모두 window
// 위 함수는 a.b.c()이런 식으로 호출한 객체를 타고 올라가는 형태가 아닙니다.
// window 입장에서는 a를 실행시키면 -> b를 실행 -> c를 실행
// 결국엔 호출한 것은 window
