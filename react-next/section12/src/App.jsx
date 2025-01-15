import "./App.css";
import { useReducer, useRef, createContext } from "react";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Notfound from "./pages/Notfound";
import { Routes, Route } from "react-router-dom";
import Button from "./components/Button";
import Header from "./components/Header";
import Edit from "./pages/Edit";

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2/ " /new" : 새로운 일기를 작성하는 new  페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지

const mockData = [
  {
    id: 1,
    createdDate: new Date().getTime(),
    emtionId: 1,
    content: "1번 일기 내용",
  },
  {
    id: 2,
    createdDate: new Date().getTime(),
    emtionId: 2,
    content: "2번 일기 내용",
  },
];

const DiaryContext = createContext()
const DiaryDispatchContext = createContext()

function App() {
  const idRef = useRef(3); // id값의 초기값으로 3으로 설정 mock 데이터의 아이디가 2번까지 있기 때문문
  function reducer(state, action) {
    switch (action.type) {
      case "CREATE":
        return [...state, action.data];
      case "UPDATE":
        return state.map((item) =>
          String(item.id) === String(action.data.id) ? action.data : item
        );
      case "DELETE":
        return state.filter((item) => String(item.id) !== String(action.id));
      default:
        return state;
    }
  }
  // add new diary

  const onCreate = (createdDate, emtionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emtionId,
        content,
      },
    });
  };

  // modify diary

  const onUpdate = (id, createdDate, emtionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emtionId,
        content,
      },
    });
  };

  const onDelete = (id) => {
    dispatch({ type: "DELETE", id });
  };

  // delete diary

  const [data, dispatch] = useReducer(reducer, mockData);
  return (
    // Routes 외부에 컴포넌트를 배치하면, 루트와 관계없이 무조건 렌더링이 됨
    <>
      
      <DiaryContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{onCreate,onUpdate,onDelete}}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/new:id" element={<New />} />
            <Route path="/diary/:id/:title" element={<Diary />} />
            <Route path="*" element={<Notfound />}></Route>
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryContext.Provider>
    </>
  );
}

export default App;
