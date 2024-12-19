import "./Editor.css";
import { useState,useRef } from "react";
const Editor = ({ onCreate }) => {
  const [content, setContent] = useState("");
  const contentRef = useRef()
  const onKeyDown = (e)=>{
    if(e.keyCode === 13){
        onSubmit()
    }
  }
  const onChange = (e) => {
    setContent(e.target.value);
  };
  const onSubmit = () => {
    if(content ===""){
        contentRef.current.focus() 
        return // 빈문자열인 상태로, 추가 버튼을 누르게되면, 그냥 바로 return을 하여, onCreate함수를 호출하지 않는다. 
    }
    console.log(content);
    onCreate(content);
    setContent("") // 값을 입력하고, 추가버튼을 누르면, 기존 입력필드에 입력한 값이 사라진다. 
    // 234를 입력하고, 추가 버튼을 누르면, 234가 계속 입력 필드에 남아있음. 
  };
  return (
    <div className="Editor">
      <input
        onKeyDown={onKeyDown}
        ref={contentRef}
        value={content}
        placeholder="새로운 Todo..."
        onChange={onChange}
      ></input>
      <button onClick={onSubmit}>추가</button>
    </div>
  );
};

export default Editor;
