import { useParams,useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import View from "../components/View";
import { useContext } from "react";
import { DiaryDispatchContext } from "../App";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/getStringDate";
import usePageTitle from "../hooks/usePagetitle";
const Diary = () => {
  
  const data = useContext(DiaryDispatchContext)
  const params = useParams();
  const nav = useNavigate() 
  const [value, setvalue] = useSearchParams(); // 쿼리 스트링 하는 방법
  const curDiaryItem = useDiary(params.id)
  usePageTitle(`${params.id}번 일기`); 
  if (!curDiaryItem){
    return <div>데이터 로딩중...!</div>
  }
  const { createdDate,emotionId,content} = curDiaryItem
  
  const title = getStringedDate(new Date(createdDate));
  console.log(value.get("value"), value.get("test")); // { search: '?title=hello&content=world' }
  console.log(params.id);
  return (
    <div>
      <Header
        title={`${title}기록`}
        rightChild={<Button text={"수정하기"} onClick={()=>nav(`/edit/${params.id}`)} />}
        leftChild={<Button text={"< 뒤로가기"} onClick={()=>{nav(-1)}} />}
      />
      
      <View emotionId={emotionId} content={content}/>

      {/* <EmotionItem emotionId={params.id}/> */}
    </div>
  );
};

export default Diary;
