// JSX 주의사항
// 1. 중괄호 내부에는 자바스크립트 표현식만 넣을 수 있다
// 2, 숫자, 문자열, 배열 값만 렌더링 된다. -> for, if는 안된다. 그리고 불리언 , undefined, null은 렌더링이 안된다.
// 3. 모든 태그는 닫혀있어야 한다.
// 4. 최상위 태그는 반드시 하나여야만 한다. 여기서는 <main> 태그 , 빈 태그로 최상위 태그를 사용 가능

import "./Main.css";
const Main = () => {
  const user = {
    name: "박원진",
    isLogin: false,
  };

  if (user.isLogin) {
    return (
      <div
        style={{
          backgroundColor: user.isLogin ? "blue" : "red",
          color: "yellow",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={() => {}}
      >
        로그인
      </div>
    );
  } else {
    return <div className="logout">로그아웃</div>;
  }

  // return (
  // <>
  //     {/* {user.isLogin ? <div>로그아웃</div> : <div>로그인</div>}
  //      */}
  //</>
};

export default Main; // default export를 사용하여 Main 컴포��트를 default로 export
