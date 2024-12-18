import { useState } from 'react'
import Viewer from './components/Viewer'
import './App.css'
import Controller from './components/Controller'
function App() {
  
// section 태그를 적용하는 이유는, 컴포넌트마다 스타일을 적용하기 위해서이다.
  const [count, setCount] = useState(0)
  const onClickButton=(value)=>{
    setCount(count+value)

  }
  return (
    <div className="App">
      <h1>Simple Counter</h1>
      <section>
        <Viewer count={count} />
      </section>
      <section>
        <Controller onClickButton={onClickButton}></Controller>
      </section>
    </div>
  );
}

export default App
