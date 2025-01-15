import Button from './Button'
import "./DiaryList.css"
import DiaryItem from "./DiaryItem"
const DiaryList = () =>{
    return (
      <div className="DiaryList">
        <div className="menu_bar">
          <select>
            <option value={"latest"}>최신순</option>
            <option value={"oldest"}>오래된 순</option>
          </select>
          <Button text={"새 일기쓰기"} type={"POSITIVE"} />
        </div>

        <div className="List_wrapper">
            <DiaryItem/>
        </div>
      </div>
    );
}

export default DiaryList;