// promise

// function add10(num) {
//   const promise = new Promise((resolve, reject) => {
//     // 비동기 작업 실행하는 함수
//     // executor

//     setTimeout(() => {
//       if (typeof num === "number") {
//         resolve(num + 10); // 성공 -> 결과로 10 * 2가 적용된다.
//       } else {
//         reject("num이 숫자가 아닙니다."); // 실패할 경우, 출력하는 메시지
//       }
//       // resolve("안녕");// 성공
//       // reject("왜 실패했는지, 그 이유를"); // 실패
//     }, 2000);
//   });
//   return promise;
// }

// // then

// // // 그 후에 ( 성공한 후에 )
// // // reject의 경우에는 실행되지 않는다.
// // promise.then((value) => {
// //   console.log(value); // 20 -> resolve의 결과를 출력
// // }).catch((error)=>{
// //     console.log(error); // reject가 발생할 때 출력된다.
// // })

// const p = add10(0); // 10
// p.then((result) => {
//   console.log(result);

//   const newP = add10(result); // 이전 반환한 result 값을 다시 매개변수 인자로 넣는다.
//   newP
//     .then((result) => {
//       console.log(result);
//       return add10(undefined); // 20 -> catch 발생
//     })
//     .then((result) => {
//       console.log(result); // 30
//     });
// }).catch((error) => {
//   console.log(error); // 0, add10(0)에서 reject가 발생했기 때문에 catch로 이���
// });

`promise 객체 연습`;

function test_promise(num) {
  const promise_test = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof num === "number") {
        resolve(num * 10);
      } else {
        reject("num must be a number");
      }
    }, 2000);
  });
  return promise_test;
}
test_promise(10).then((result) => {console.log(result)});
