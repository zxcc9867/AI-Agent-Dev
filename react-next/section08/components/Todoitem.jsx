import './Todoitem.css'
const TodoItem = ()=>{
    return (
      <div>
        <div className="TodoItem">
          <input type="checkbox"></input>
          <div className="content">Todo</div>
          <div className="date">Date</div>
          <button>삭제</button>
        </div>
      </div>
    );
}

export default TodoItem;