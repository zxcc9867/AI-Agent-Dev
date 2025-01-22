import "./App.css";
import { useReducer, useRef, createContext, useEffect, useState } from "react";
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
    createdDate: new Date("2025-01-19").getTime(),
    emotionId: 1,
    content: "1번 일기 내용",
  },
  {
    id: 2,
    createdDate: new Date("2025-01-18").getTime(),
    emotionId: 2,
    content: "2번 일기 내용",
  },
  {
    id: 3,
    createdDate: new Date("2024-12-19").getTime(),
    emotionId: 2,
    content: "3번 일기 내용",
  },
];

export const DiaryContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading,setIsLoading] = useState(true)
  // localStorage.setItem("test", "hello");
  // localStorage.setItem("person", JSON.stringify({ name: "park" })); // 객체를 문자열로 넘겨줌.

  console.log(JSON.parse(localStorage.getItem("person"))); // 문자열을 객체형태로 변환
  // JSON.parse 는 undefined이 아닌 경우에만 사용할 수 있다.

  // 로컬 스토리지 값을 삭제
  localStorage.removeItem("test");

  const idRef = useRef(3); // id값의 초기값으로 3으로 설정 mock 데이터의 아이디가 2번까지 있기 때문
  let nextState;

  useEffect(() => {
    const storedData = localStorage.getItem("diary")
    if(!storedData){
      setIsLoading(false);
      return
    }
    const parsedData = JSON.parse(storedData)
    if(!Array.isArray(parsedData)){
      return
    }

    let maxId=0
    parsedData.forEach(item=>{
      if(Number(item.id) > maxId){
        maxId = Number(item.id)
        
      }
      
    })
    idRef.current = maxId+1;
    dispatch({
      type: "INIT",
      data: parsedData,
    })
    setIsLoading(false)
  },[])
  function reducer(state, action) {
    switch (action.type) {
      case "INIT":
        return action.data;
      
      case "CREATE": {
        nextState = [...state, action.data];
        break;
      }
      case "UPDATE": {
        nextState = state.map((item) =>
          String(item.id) === String(action.data.id) ? action.data : item
        );
        break;
      }
      case "DELETE": {
        nextState = state.filter(
          (item) => String(item.id) !== String(action.id)
        );
        break;
      }
      default:
        return state;
    }
    localStorage.setItem("diary", JSON.stringify(nextState)); // state를 JSON.stringify()로 문자열로 변환하고 localStorage에 저장
    return nextState;
  }
  // add new diary

  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // modify diary

  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  const onDelete = (id) => {
    dispatch({ type: "DELETE", id });
  };

  // delete diary

  const [data, dispatch] = useReducer(reducer,[]);

  if (isLoading){
    return <div>데이터 로딩중입니다.</div>
  }
  return (
    // Routes 외부에 컴포넌트를 배치하면, 루트와 관계없이 무조건 렌더링이 됨
    <>
      <DiaryContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{ onCreate, onUpdate, onDelete }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id/" element={<Diary />} />
            <Route path="*" element={<Notfound />}></Route>
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryContext.Provider>
    </>
  );
}

export default App;
