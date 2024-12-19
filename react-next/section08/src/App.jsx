import Header from '../components/Header'
import Editor from '../components/Editor'
import List from '../components/List'
import './App.css'
import '../components/Header.css'
import { useState, useRef } from 'react'

// App 외부에 mockData를 작성함으로써, App이 리렌더링될 때 
// 다시 값이 초기화되지 않도록 한다. 어차피 const라서 초기화되지 않겠지만
const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래하기",
    date: new Date().getTime(),
  },
];
function App() {
  const idRef= useRef(3) // 리렌더링 해도 유지되는 값을 지정, 즉, 3으로 해놓으면, 리렌더링해도 값이 유지 
  const [todos,SetTodos]=useState(mockData)
  const onCreate = (content)=>{
    const newTodo={
      id:idRef.current++, // 초기값은 3으로 지정했으므로, id=3, 그리고 이후, 4로 올림. 
      isDone:false,
      content:content,
      date: new Date().getTime(),
    }
    // 리액트가 상태변화를 감지하기 위해 상태 함수를 통해 값을 변경해주어야한다. 
    SetTodos([newTodo,...todos])
  }
  return (
    <div className="App">
      <Header></Header>
      <Editor onCreate={onCreate}></Editor>
      <List></List>
    </div>
  );
}

export default App
