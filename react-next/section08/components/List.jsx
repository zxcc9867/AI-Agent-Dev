import "./List.css";
import TodoItem from "./Todoitem";
const List = () => {
  return (
    <div className="List">
      <h4>To do List✨😘</h4>
      <input placeholder="검색어를 입력하세요."></input>
      <div className="todos_wrapper">
        <TodoItem />
        <TodoItem />
        <TodoItem />
      </div>
    </div>
  );
};

export default List;
