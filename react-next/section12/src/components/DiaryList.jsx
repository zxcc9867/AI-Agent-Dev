import Button from './Button'
import "./DiaryList.css"
import DiaryItem from "./DiaryItem"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
const DiaryList = ({data}) =>{
  const [sortType, setSortType] = useState("latest");

  const getSortedDate = () => {
    return data.toSorted((a, b) => {
      if (sortType === "latest") {
        return Number(b.createdDate) - Number(a.createdDate);
      } else {
        return Number(a.createdDate) - Number(b.createdDate);
      }
    });
  };
  const sortedData = getSortedDate(); // 는 상태 함수의 값이 변경이 되면, 컴포넌트가 리렌더링되므로,
  // 컴포넌트 안에 속해있는 함수가 실행이되어서 getSortedDate가 수행이 되고, 그 값이 sortedData에 들어가게된다. 
  // 리액트는 컴포넌트가 재실행되면, 컴포넌트에 정의되어 있는 함수와 console.log와 같은 모든 코드가 재실행된다. 
  const onChangeSortType = (e) => {
    setSortType(e.target.value);
  };
  const nav = useNavigate();
  return (
    <div className="DiaryList">
      <div className="menu_bar">
        <select onChange={onChangeSortType}>
          <option value={"latest"}>최신순</option>
          <option value={"oldest"}>오래된 순</option>
        </select>
        <Button
          text={"새 일기쓰기"}
          onClick={() => {
            nav(`/new/`);
          }}
          type={"POSITIVE"}
        />
      </div>

      <div className="List_wrapper">
        {sortedData.map((item) => (
          <DiaryItem key={item.id} {...item}></DiaryItem>
        ))}
      </div>
    </div>
  );
}

export default DiaryList;