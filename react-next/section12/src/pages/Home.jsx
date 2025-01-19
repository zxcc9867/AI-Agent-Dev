import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { useState, useContext } from "react";
import { DiaryContext } from "../App";

const getMonthlyDate = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();
  // getMonth()+1,0)는 현재 날짜의 다음달의 0일이므로, 현재날짜의 마지막날을 의미한다.
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();
  // 이번달안에 작성된 일기를 필터
  return data.filter(
    (item) => beginTime <= item.createdDate && item.createdDate <= endTime
  );
};
const Home = () => {
  const data = useContext(DiaryContext);

  

  const [pivotDate, setpivotDate] = useState(new Date());

  const montlyData = getMonthlyDate(pivotDate, data);

  // new로 새로운 객체를 만들어야, react는 상태를 감지하고, 재렌더링을 한다.
  const onIncreaseMonth = () => {
    setpivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    setpivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };
  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button onClick={onDecreaseMonth} text={"<"} />}
        rightChild={<Button onClick={onIncreaseMonth} text={">"} />}
      />
      <DiaryList data={montlyData}/>
    </div>
  );
};

export default Home;
