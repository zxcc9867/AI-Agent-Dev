import { memo } from "react";
import "./Todoitem.css";
const TodoItem = ({ id, isDone, content, date, onUpdate, onDelete }) => {
  const onChangeCheckBox = () => {
    onUpdate(id);
  };
  const onDeleteList = () => {
    onDelete(id);
  };
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

// memo로 인해, TodoTtem이 받고 있는 id, isDone, content 등의 값이 바뀌지 않는 한, 리렌더링 되지 않는다.
// memo 메서드는 얕은 비교를 수행한다. 함수는 객체형태이기 때문에,
// const a = {a:1} , const b = {b:1 }을 const a === b -> false가 나오는 것처럼 ( 객체는 주소값을 사용하여, 값을 저장한다. )
// 매번 create, update 함수가 실행되어도, 그 값이 다른 것으로 인식되어 todolist의 모든 부분이 리렌더링된다.

// 고차 컴포넌트
// export default memo(TodoItem, (prevProps, nextProps) => {
//   // 반환값에 따라 Props가 바뀌었는지 안바뀌었는지 판단
//   // T -> Props 바뀌지 않음 -> 리렌더링 X
//   // F -> Props 바뀜 -> 리렌더링 O

//   console.log(nextProps);
//   // 아래의 값이 바뀌었을 때만 페이지 리렌더링
//   if (prevProps.id !== nextProps.id) {
//     console.log(`id 변경`);
//     return false;
//   }
//   if (prevProps.isDone !== nextProps.isDone) {
//     console.log(`체크박스 변경`);
//     return false;
//   }
//   if (prevProps.content !== nextProps.content) return false;
//   if (prevProps.date !== nextProps.date) return false;
//   return true;
// });
export default memo(TodoItem);
