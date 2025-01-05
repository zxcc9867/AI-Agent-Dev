import { act, useReducer } from "react";

// reducer 는 변환기라는 의미
// 상태를 실제로 변화시키는 변환기 역할
function reducer(state, action) {
  // 액션객체는 action 매개변수로 전달된다.
  console.log(state, action);
//   if (action.type === "INCREASE") {
//     return state + action.data;
//   }
//   else if (action.type === "DECREASE") {
//     return state - action.data;
//   }
switch (action.type) {
    case "INCREASE":
      return state + action.data;
    case "DECREASE":
      return state - action.data;
    default:
      return state; // default : state가 변하지 않아도 dispatch를 호출할 때 state를 전����아야 한다.
  
}
}

const Exam = () => {
  const [state, dispatch] = useReducer(reducer, 0); // 상태 변화가 감지되었을 때 reducer 함수를 호출 , 두번째 인수는 state의 초기값
  // dispatch : 발송하다, 급송하다
  // 상태 변화가 잇어야 한다는 사실을 알리는 , 발송하는 함수

  // 버튼이 클릭되면, distpatch의 상태가 액션 객체로 되고, 이러한 상태 변화를 감지해서
  // useReducer가 reducer 함수를 호출헤서 실제 값을 변환한다.
  const onClickPlus = () => {
    // 인수 : 상태가 어떻게 변화되길 원하는지
    // 아래와 같은 객체를 dispatch에 전달한다. 아래와 같은 객체를 액션 객체라고 한다.
    dispatch({
      type: "INCREASE",
      data: 1, // 1만큼 증가시켜라
    });
  };

  const onClickMinus= () => {
  dispatch({
    type : "DECREASE",
    data : 1
  })
}
  return (
    <div>
      <h1>{state}</h1>
      <button onClick={onClickPlus}>+</button>
      <button onClick={onClickMinus}>-</button>
    </div>
  );
};

export default Exam;
