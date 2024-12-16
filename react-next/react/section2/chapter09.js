// 배열의 변형

// 1. filter

// 기존 배열에서 조건을 만족하는 요소들만 필터링하여 새로운 배열로 반환

let arr1 = [
  {
    name: "park",
    hobby: "독서",
  },
  {
    name: "kim",
    hobby: "요리",
  },
  { name: "lee", hobby: "요리" },
];

const tennisPeople = arr1.filter((item) => {
  if (item.hobby === "독서") return true;
});

// 2. 콜백함수에 대해

function greetUser(callback1) {
  const name = "홍길동";
  callback1(name); // 콜백 함수 호출
}

// 익명 함수 전달
greetUser(function (userName) {
  console.log(`안녕하세요, ${userName}님!`);
}); // 함수 자체가 다른 함수의 매개변수에 들어가게 된다.

// 2. map 메서드

// 배열의 모든 요소를 순회하면서, 각각 콜백함수를 실행하고, 그 결과값들을 모아서
// 새로운 배열로 반환

let arr2 = [1, 2, 3];

const mapResult = arr2.map((item, idx, arr2) => {
  console.log(idx, item);
  return item * 2; // map() 메서드의 return 값은 새로운 배열의 각 요소
});

console.log(mapResult);

// map 연습

const arr_test2 = [
  {
    name: "kim",
    age: 25,
    hobby: "swimming",
  },
  {
    name: "lee",
    age: 30,
    hobby: "reading",
  },
];

const result_test2 = arr_test2.map((item) => {
  return item.name;
});
console.log(result_test2);

// 복습

// filter

arr = [1, 2, 3, 4, 5];

const result = arr.filter((item) => item === 1);

console.log(result); // [1,2,3,4,5]

object_arr = [
  { name: "kim", age: 35 },
  { name: "lee", age: 20 },
];

const result2 = object_arr.filter((item) => item.age === 20);

// console.log(`결과 : ${JSON.stringify(result2)}`);
// 자바 스크립트에서는 객체 배열을 문자열로 반환하려고하면, 기본적으로 object라고 출력된다.

// map 연습

`forEach는 반환 값이 없지만, map은 반환값이 있다.`;

let arr_test = [1, 2, 3, 4, 5];

const result_test = arr_test.map((item) => {
  item ** 2; // return을 해주어야한다.
});

// map, foreach 등 배열 메서드는 콜백함수이다.

// 콜백함수는 {}를 사용할 때는 return을 적어주던가,

// 괄호를 생략하고 작성하면 자동으로 return이 적용된다.

const result_test_v1 = arr_test.map((item) => item ** 2);

// console.log(result_test_v1); // [1, 4, 9, 16, 25]

const object_arr_res = object_arr.map((item) => item.name);

// console.log(object_arr_res);

// sort 메서드 -> 배열을 사전순으로 정렬한다.

let arr3 = ["b", "a", "c"];

arr3.sort();

console.log(arr3);

// sort 명령어는 문자열에서만 사용할 수 있다. -> 배열을 사전순으로 정렬하기 때문

// 숫자의 대소 관계를 기준으로 정렬하고 싶을 때에는

let arr5 = [1, 5, 7, 9, 10, 2];

arr5.sort((a, b) => {
  if (a > b) {
    //b가 a앞에 와라 -> 오름차순
    return 1; // 양수면, 작은값이 앞으로 오도록 된다.
  } else if (a < b) {
    //a가 b 앞에 와라
    return -1;
  } else {
    //두 값의 자리를 바꾸지 마라
    return 0;
  }
});

console.log(arr5);

// 위의 숫자 정렬을 더욱 간단하게 하는 방법이 있다.

arr5.sort((a, b) => a - b); // 오름 차순 정렬

console.log(arr5);

arr5.sort((a, b) => b - a); // 내림차순 정렬

console.log(arr5);

// 4. toSorted

// sort와 비슷한데, sort는 원본 배열을 정렬하는 것이지만,
// toSorted는 원본 배열이 아닌, 새로운 배열을 만든다.

let arr7 = ["C", "A", "B"];

const sorted = arr5.toSorted();

console.log(sorted); // ["A", "B", "C"]

console.log(arr7); // ["C", "A", "B"]

// 5. join 메서드

// 배열의 모든 요소를 하나의 문자열로 합쳐서 반환하는 그런 메서드

let arr6 = ["hi", "lo", "hi", "lo"];

const joined = arr6.join("-"); // 각 원소의 구분자를 - 로 설정한다.

console.log(joined); // hi, lo, hi, lo -> 문자열로 출력
