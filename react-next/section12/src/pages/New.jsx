import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from "../App";
import usePageTitle from "../hooks/usePagetitle";
const New = () => {
  const nav = useNavigate();
  const { onCreate } = useContext(DiaryDispatchContext);

  usePageTitle("새 일기 쓰기")

  const onSubmit = (input) => {
    onCreate(input.createdDate.getTime(), input.emotionId, input.content),[];
    nav("/", { replace: true }
      
    ); // 뒤로가기 버튼을 방지하는 옵션으로 replace : true 사용
  };
  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        // -1을 nav에 넣어주면, 페이지를 뒤로가기
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
      />
      <Editor onSubmit={onSubmit}></Editor>
    </div>
  );
};

export default New;
