import { memo } from "react";
const Header = () => {
  return (
    <div className="Header">
      <h3>TO DO LIST 😊 </h3>
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
};


// 자신이 받는 props가 바뀌지 않으면, 리렌더링되지 않는다.
export default memo(Header);
