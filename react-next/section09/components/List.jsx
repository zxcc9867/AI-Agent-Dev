import "./List.css";
import TodoItem from "./Todoitem";
import { useState } from "react";
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

  const filteredTodos = getFilteredData();
  return (
    <div className="List">
      <h4>To do List✨😘</h4>
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
