import "./App.css";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Notfound from "./pages/Notfound";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { getEmotionImage } from "./util/get-emtion-images";

// 1. "/" : 모든 일기를 조회하는 Home 페이지
// 2/ " /new" : 새로운 일기를 작성하는 new  페이지
// 3. "/diary" : 일기를 상세히 조회하는 Diary 페이지

function App() {
  const nav = useNavigate();
  const onClickButton = () => {
    nav("/new"); // 이동하고자 하는 경로를 넣는다
  };
  return (
    // Routes 외부에 컴포넌트를 배치하면, 루트와 관계없이 무조건 렌더링이 됨
    <>
      <div>
        <img src={getEmotionImage(1)}></img>
        <img src={getEmotionImage(2)}></img>
        <img src={getEmotionImage(3)}></img>
        <img src={getEmotionImage(4)}></img>
        <img src={getEmotionImage(5)}></img>
      </div>
      <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/new"}>New</Link>
        <Link to={"/diary"}>Diary</Link>
        <a href="/new">new</a>
      </div>
      <button onClick={onClickButton}>페이지 이동</button>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new:id" element={<New />} />
        <Route path="/diary/:id/:title" element={<Diary />} />
        <Route path="*" element={<Notfound />}></Route>
      </Routes>
    </>
  );
}

export default App;
