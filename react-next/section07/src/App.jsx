import { useState, useEffect, useRef } from "react";
import Viewer from "./components/Viewer";
import "./App.css";
import Controller from "./components/Controller";
import Even from "./components/Even";
function App() {
  const istMount = useRef(false);
  // 라이프 사이클

  //1. 마운트 : 탄생
  useEffect(() => {
    console.log("마운트");
  }, []); // 빈배열이기 때문에 상태 변경이 없어 한번만 출력이 된다.
  //2. 업데이트 : 변화 ,리렌더링

  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!istMount.current) {
      istMount.current = true;
      return;
    }
    console.log("update");
  }); // use effect는 2번째 인자의 값이 바뀔 때마다, 첫번째 익명함수가 실행된다.
  // useEffect의 2번째 인자의 배열은 의존성 배열이라고 부른다.

  // 3. 언마운트 : 죽음


  const onClickButton = (value) => {
    setCount(count + value);
  };
  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <Viewer count={count} />
      </section>
      <section>
        {count % 2 === 0 ? <Even/> : null}
      </section>
      <section>
        <Controller onClickButton={onClickButton}></Controller>
      </section>
    </div>
  );
}

export default App;
