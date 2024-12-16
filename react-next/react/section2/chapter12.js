// function add(a, b, callback) {
//   setTimeout(() => {
//     const sum = a + b;
//     callback(sum);
//   }, 3000);
// }

// add(1, 2, (value) => {
//   console.log(value);
// });

`음식을 주문하는 상황`;

// function order_food(callback) {
//   setTimeout(() => {
//     const food = "떡볶이";
//     callback(food);
//   }, 3000);
// }

// order_food((food) => {
//   console.log(`주문하신 : ${food}가 나왔습니다.`);
//   cooldownFood(food, (cooldownFood) => {
//     console.log(cooldownFood);
//     freezeFood(cooldownFood, (freezeFood) => {
//       console.log(freezeFood);
//     });
//   });
// });

// function freezeFood(food, callback) {
//   setTimeout(() => {
//     const freezeFood = `냉동된${food}`;
//     callback(freezeFood);
//   }, 1500);
// }

// function cooldownFood(food, callback) {
//   setTimeout(() => {
//     const cooldownFood = `식은 ${food}`;
//     callback(cooldownFood);
//   }, 2000);
// }

// 비동기 연습

`영화 티켓을 사는 상황`;

// 콜백 함수 내부에서 참조하는 매개변수들은 undefined
// 즉, setTimeout((item)=>{console.log(item}) 는 undefined가 출력된다.
function buyticket(callback) {
  setTimeout(() => {
    const ticket = "액션영화 티켓";
    callback(ticket);
  }, 3000);
}

function ticket_print(ticket,callback) {
  setTimeout(() => {
    callback(ticket);
  },3000);
}

buyticket((ticket) => {
  console.log(`구입한 ${ticket}`);
  ticket_print(ticket,(ticket)=>{
    console.log(`${ticket}를 출력합니다.`);
  })
});
