// 구조 분해 할당

// 배열의 구조 분해 할당

// 각각의 변수에 할당하고자할때
let arr = [1, 2, 3];

// let one = arr[1]

// let two = arr[2]

// 위의 방식으로 하면 불편하다.

// 구조 분해할당
let [one, two, three, four = 4] = arr; // arr에 있는 변수들이 각각 변수에 할당된다.

console.log(one, two, three, four); // 1,2,3,4 출력

// 객체의 구조 분해할당

let person = {
  name: "John",
  age: 27,
  hobby: "reading",
};

// 객체는 중괄호
// myAge라는 값에 age값이 들어가게 되어 출력된다.
let { name, myAge, hobby, extra } = person; // 객체의 구조 분해할당

// console.log(name, myAge, hobby , extra) // John, 27, reading 출력 , undifined

// 객체 구조 분해할당을 이용해서 함수의 매개변수를 받는 방법

const func = ({ name, age, extra }) => {
  console.log(name, age, extra);
};

func(person);

const test = ({ date, company, result }) => {
  if ((date && company && result) || console.log("값이 설정되지 않았습니다."))
    console.log(
      `${date}에 , 최종면접의 결과는 ${result}입니다 ! 수고하셨습니다 !`
    );
  if (result === "합격") {
    console.log(`${company}에 입사하신 것을 환영합니다 ! `);
  }
};

test({
  date: "2024-12-10",
  company: "나를 원하고 내가 성장할 수 있는 회사사",
  result: "합격",
});

test({});

/// 구조 분해 할당 연습

const Decomposition = (num, ...args) => {
  [a, b, c] = args;
  console.log(a, b, c); // 20, "행복",undefined
  console.log(num);
};
Decomposition(10, 20, "행복");
