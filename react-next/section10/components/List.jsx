import "./List.css";
import TodoItem from "./Todoitem";
import { useState,useMemo } from "react";
const List = ({ todos, onUpdate, onDelete }) => {
  // App.jsx에서 List todos에서 전달된 값
  const [search, setSerach] = useState("");
  const onChangeSearch = (e) => {
    setSerach(e.target.value);
  };

  const getFilteredData = () => {
    if (search === "") {
      return todos;
    }
    // 필터링을 하는데, todo를 순회하면서, todo의 content값에 search 필드에 입력된 값이 포함된 것을 찾는다.
    // todo.content에는 "리액트 공부하기" 등의 문자열이 들어가있다.
    // todo의 값이 있는지없는지를 include에서 T / F로 출력한다.
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  // 렌더링 될 때마다 호출이 된다. 
  // const {totalCount , doneCount, notDoneCount}=getAnalyzedData()
  
  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    console.log("getAnalyzedData 호출 ");
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);// 의존성 배열 deps 
  // deps에 포함되어 있는 값이 변경되었을 때, 콜백함수를 실행한다. 
  // 때문에, 위의 콜백함수를 페이지가 렌더링 될 때마다 실행하지 않는다. 
  const filteredTodos = getFilteredData();
  return (
    <div className="List">
      <h4>To do List✨😘</h4>
      <div>
        <div>total : {totalCount}</div>
        <div>done : {doneCount}</div>
        <div>not done : {notDoneCount}</div>
      </div>

      <input
        value={search}
        onChange={onChangeSearch}
        placeholder="Search for tasks to do"
      ></input>
      <div className="todos_wrapper">
        {filteredTodos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          );
        })}
      </div>
    </div>
  );
};

export default List;
