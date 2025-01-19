import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
const New = () => {
  const nav=useNavigate()
  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        // -1을 nav에 넣어주면, 페이지를 뒤로가기 
        leftChild={<Button onClick={()=>nav(-1)} text={"< 뒤로가기"} />}
      />
      <Editor></Editor>
    </div>
  );
};

export default New;
