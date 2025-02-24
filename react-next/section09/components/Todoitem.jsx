import "./Todoitem.css";
const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  const onChangeCheckBox = () => {
    onUpdate(id);
  };
  const onDeleteList = ()=>{
    onDelete(id)
  }
  return (
    <div>
      <div className="TodoItem">
        <input
          onChange={onChangeCheckBox} // onclick이 아닌 onchange 이벤트를 사용 -> 체크박스를 클릭하면, 변경되는것이므로ㅓㅓ
          checked={isDone}
          type="checkbox"
        ></input>
        <div className="content">{content}</div>
        <div className="date">{new Date(date).toLocaleDateString()}</div>
        <button onClick={onDeleteList}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
