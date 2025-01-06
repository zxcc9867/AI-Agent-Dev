import Header from "../components/Header";
import Editor from "../components/Editor";
import List from "../components/List";
import "./App.css";
import "../components/Header.css";
import {
  useReducer,
  useState,
  useRef,
  useCallback,
  createContext,
  useMemo,
} from "react";

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

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [...state, action.data];
    case "UPDATE":
      return state.map((item) =>
        // 체크박스만 반전이 된다.
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
      );
    case "DELETE":
      return state.filter((item) => item.id !== action.targetId);
    default:
      return state;
  }
}

// 컨텍스트 - 하위 컴포넌트들에게 프로퍼티를 전달하기 위해, 프로퍼티 값을 보존함 

export const TodoStateContext = createContext()

export const TodoDispatchContext = createContext()

function App() {
  const idRef = useRef(3); // 리렌더링 해도 유지되는 값을 지정, 즉, 3으로 해놓으면, 리렌더링해도 값이 유지
  // const [todos, SetTodos] = useState(mockData);
  const [todos, dispatch] = useReducer(reducer, mockData);
  const onDelete = useCallback((targetId) => {
    // 인수 : todos 배열에서 targetId와 일치하는 id를 갖는 요소만 삭제한 새로운 배열
    // 조건을 만족하는 것만 따로 배열을 리턴한다.
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  });
  const onUpdate = useCallback((targetId) => {
    // todos State의 값들 중에
    // targetId와 일치하는 id를 갖는 투두 아이템의 isDone 변경

    // 인수 : todos 배열에서 targetId와 일치하는 id를 갖는 요소의 데이터만 딱 바꾼 새로운 배열

    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  });

  

  // 함수 최적화 
  // 리렌더링이 되더라도, 아래의 구문의 함수는 리렌더링 되지 않는다. 
  const onCreate = useCallback((content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  },[])
  const memoizedDispatch = useMemo(()=>{return {onCreate,onUpdate,onDelete},[]})
  return (
    <div className="App">
      <Header></Header>
      <TodoStateContext.Provider value={ todos }>
        <TodoDispatchContext.Provider value={memoizedDispatch}>
          <Editor></Editor>
          <List></List>
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
