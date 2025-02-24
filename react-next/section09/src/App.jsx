import Header from "../components/Header";
import Editor from "../components/Editor";
import List from "../components/List";
import "./App.css";
import "../components/Header.css";
import { useState, useRef } from "react";
import Exam from "../components/Exam";

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
  const idRef = useRef(3); // 리렌더링 해도 유지되는 값을 지정, 즉, 3으로 해놓으면, 리렌더링해도 값이 유지
  const [todos, SetTodos] = useState(mockData);

  const onDelete = (targetId) => {
    // 인수 : todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
    SetTodos(todos.filter((todo) => todo.id !== targetId)); // 조건을 만족하는 것만 따로 배열을 리턴한다.
  };
  const onUpdate = (targetId) => {
    // todos State의 값들 중에
    // targetId와 일치하는 id를 갖는 투두 아이템의 isDone 변경

    // 인수 : todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열

    SetTodos(
      todos.map((todo) =>
        todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++, // 초기값은 3으로 지정했으므로, id=3, 그리고 이후, 4로 올림.
      isDone: false,
      content: content,
      date: new Date().getTime(),
    };
    // 리액트가 상태변화를 감지하기 위해 상태 함수를 통해 값을 변경해주어야한다.
    SetTodos([newTodo, ...todos]);
  };
  return (
    <div className="App">
      <Exam></Exam>
      {/* <Header></Header>
      <Editor onCreate={onCreate}></Editor>
      <List onUpdate={onUpdate} onDelete={onDelete} todos={todos}></List> */}
    </div>
  );
}

export default App;
