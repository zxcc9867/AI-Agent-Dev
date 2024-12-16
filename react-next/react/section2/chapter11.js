// 기본적으로는 동기 방식으로 출력된다.
console.log(1);
console.log(2);

// 비동기

// setTime은 설정한 시간 이후에 콜백함수를 실행한다.
setTimeout(() => {
  console.log(3);
}, 3000);

console.log(4);
