import { useState
 } from "react";


 // props는 객체이기 때문에 구조분해할당으로 값을 받아야 한다. 
const Viewer = ({count}) => {

  return (
    <div>
      <div>현재 카운트 :</div>
      <h1>{count}</h1>
    </div>
  );
};
export default Viewer;
