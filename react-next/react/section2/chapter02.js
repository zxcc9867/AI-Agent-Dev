// 단락 평가

// function returnFalse(){
//     console.log('false');  // false 함수가 console.log를 출력하��로, true 출력
//     return false;
// }

// function returnTrue(){
//     console.log('true'); // true
//     return true;
// }

// console.log(returnFalse() && console.log('true')); // false 함수가 false를 출력하므로, 무조건 false 출력
// 현재 출력으로는 false만 출력이 된다. 즉, retrunTrue 자체가 호출이 안되었다.
// false 함수에 의해 무조건 false이기 때문에, 실행하지 않아도 false이기 때문에 true 함수를 호출조차 하지않았다.

// function returnFalse(){
//     console.log('false');  // false 함수가 console.log를 출력하��로, true 출력
//     return undefined;
// }

// function returnTrue(){
//     console.log('true'); // true
//     return 10;
// }

// console.log(returnTrue() && returnFalse()); // &&와 같은 논리연산자는 마지막으로 평가된 값을 반환
// // 마지막으로 false이기 때문에 false 값인 undefined만 반환하고, 10은 반환하지 않는다.

// console.log(returnTrue() || returnFalse()); // 마지막 평가 값이 참이기 때문에 10을 반환

// 단락 평가 활용 사례

function printName(person) {
  const name = person && person.name;
  console.log(name || "person의 값이 없다."); // 만약 person이 없으면 , person.name은 실행되지 않는다. , or은 T,F라면 T값을 출력
  // or의 경우, T||T의 경우, 첫번째 트루시한 값이 출력되므로, name에 값이 있다면, person.name이 실행되어 정상적으로 값이 출력된다.
  // and의 경우, T && T는 맨마지막의 T가 반환된다.
}

printName(); // undefined
printName({ name: "park" }); // undefined

// 복습

// 단락 평가에 대해서

function truty() {
  return true;
}

const print_truty = () => print("true_2");

const print_false = () => false;

// T && F

console.log(truty() && print_false()); // T / F

//true
console.log(truty() || print_false()); //

// true : true

console.log(print_truty() || truty());
