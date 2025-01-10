import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
const Diary = () => {
  const params = useParams();
  const [value, setvalue] = useSearchParams(); // 쿼리 스트링 하는 방법
  console.log(params); // { id: '123' }
  console.log(value.get("value"),value.get("test")); // { search: '?title=hello&content=world' }
  return (
    <div>
      {params.id}번째 일기입니다. 제목은{params.title}
    </div>
  );
};

export default Diary;
